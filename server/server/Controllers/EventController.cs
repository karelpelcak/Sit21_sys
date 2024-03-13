using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;

        public EventController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("/createevent")]
        public async Task<IActionResult> CreateEvent(EventCreateEventModel createEventModel, [FromQuery] int[] ids)
        {
            if (ids == null || ids.Length == 0)
            {
                return BadRequest("Ids array is empty.");
            }

            try
            {
                foreach (int id in ids)
                {
                    var newEvent = new Event(createEventModel)
                    {
                        EventForUserID = id
                    };
                    _dbContext.Events.Add(newEvent); 
                }

                await _dbContext.SaveChangesAsync(); 

                return Ok("Events created successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to create events: {ex.Message}");
            }
        }


        [HttpPut("/editevent")]
        public async Task<IActionResult> EditEvent(EventEditEventModel eventEditEventModel)
        {
            return Ok("ok");
        }

        [HttpPut("/{eventid}/finish")]
        public async Task<IActionResult> SetFinishedEvent(int eventid)
        {
            return Ok("finished");
        }

        [HttpDelete("/{eventid}/delete")]
        public async Task<IActionResult> DeleteEvent(int eventid)
        {
            return Ok();
        }
    }
}
