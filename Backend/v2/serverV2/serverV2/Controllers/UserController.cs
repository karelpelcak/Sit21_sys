using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace serverV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public UserController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("users")]
        [Authorize]
        public async Task<IActionResult> GetUserList(string emailFilter)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to retrieve user list. " + ex.Message);
            }
        }

    }
}
