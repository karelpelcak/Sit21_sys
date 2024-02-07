using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace server.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;

        public AuthController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        [Route("/register")]
        public async Task<IActionResult> Register(RegisterModel registerModel)
        {
            var email = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == registerModel.Email);
            if (email == null)
            {
                registerModel.Password = BCrypt.Net.BCrypt.HashPassword(registerModel.Password);
                var newUser = new User(registerModel);
                _dbContext.Users.AddAsync(newUser);
                _dbContext.SaveChanges();
                //return Ok("registrace");
                var UserToHash = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == newUser.Id);
                HashID newHashID = new HashID();
                newHashID.UserID = UserToHash.Id;
                newHashID.HashedID = BCrypt.Net.BCrypt.HashPassword(UserToHash.Id.ToString());
                _dbContext.HashIds.AddAsync(newHashID);
                _dbContext.SaveChanges();
                return Ok("User registred");
            }
            else
            {
                return Ok("email already used");
            }
                
        }

        [HttpPost]
        [Route("/login")]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == loginModel.Username);
            if (user != null)
            {
                if (BCrypt.Net.BCrypt.Verify(loginModel.Password, user.Password))
                {
                    var Hash = await _dbContext.HashIds.FirstOrDefaultAsync(h => h.UserID == user.Id);
                    return Ok(Hash.HashedID);
                }
                else
                {
                    return BadRequest("wrong password");
                }
            }
            else
            {
                return BadRequest("wrong username");
            }
        }
    }
}