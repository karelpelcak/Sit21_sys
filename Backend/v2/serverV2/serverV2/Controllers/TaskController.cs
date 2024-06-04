using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using serverV2.Data;
using serverV2.Models;

namespace serverV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public TaskController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateEvent(TaskCreateTaskModel model, int[] Ids)
        {
            return Ok();
        }
    }
}
