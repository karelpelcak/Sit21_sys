using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;

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
        static string HashSHA256(string input)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(input);
                byte[] hashBytes = sha256.ComputeHash(bytes);

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    builder.Append(hashBytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
        
        [HttpPost("/register")]
        public async Task<IActionResult> Register(RegisterModel registerModel)
        {
            var email = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == registerModel.Email);
            if (email == null)
            {
                registerModel.Password = BCrypt.Net.BCrypt.HashPassword(registerModel.Password);
                var newUser = new User(registerModel);
                await _dbContext.Users.AddAsync(newUser);
                _dbContext.SaveChanges();
                var userToHash = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == newUser.Id);
                HashID newHashId = new HashID();
                newHashId.UserID = userToHash.Id;
                newHashId.HashedID = HashSHA256(userToHash.Id.ToString());
                await _dbContext.HashIds.AddAsync(newHashId);
                _dbContext.SaveChanges();
                return Ok("User registred");
            }
            else
            {
                return Ok("email already used");
            }
                
        }

        [HttpPost("/login")]
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

        [HttpGet("/user/{username}")]
        public async Task<IActionResult> UserByName(string username)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user != null)
            {
                var userData = new
                {
                    Firstname = user.Firstname,
                    Lastname = user.Lastname,
                    Username = user.Username,
                    Email = user.Email
                };
                return Ok(userData);
            }
            else
            {
                return BadRequest("User not found");
            }
        }

        [HttpGet("/users")]
        public async Task<IActionResult> AllUsers()
        {
            var Users = await _dbContext.Users.ToListAsync();
            var userData = Users.Select(u => new
            {
                Firstname = u.Firstname,
                Lastname = u.Lastname,
                Username = u.Username,
                Email = u.Email
            }).ToList();
            return Ok(userData);
        }

        [HttpGet("/hash/{hashid}")]
        public async Task<IActionResult> GetLoggedUserObject(string hashid)
        {
            var userid = await _dbContext.HashIds.FirstOrDefaultAsync(h => h.HashedID == hashid);
            if (userid != null)
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userid.UserID);
                if (user != null)
                {
                    var userData = new
                    {
                        Firstname = user.Firstname,
                        Lastname = user.Lastname,
                        Username = user.Username,
                        Email = user.Email
                    };
                    return Ok(userData);
                }
                else
                {
                    return NotFound("User not found");
                }
            }
            else
            {
                return BadRequest("Wrong hash");
            }
        }
    }
}