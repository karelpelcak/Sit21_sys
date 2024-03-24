using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            if (ids.Length == 0)
            {
                return BadRequest("Ids array is empty.");
            }
            else
            {
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

            
        }


        [HttpPut("/editevent")]
        public async Task<IActionResult> EditEvent(EventEditEventModel eventEditEventModel, int idOfEvent)
        {
            var eventsToEdit = await _dbContext.Events.Where(e => e.EventID == idOfEvent).ToListAsync();

            foreach (var eventToEdit in eventsToEdit)
            {
                eventToEdit.EventName = eventEditEventModel.EventName;
                eventToEdit.EventDesc = eventEditEventModel.EventDesc;
                eventToEdit.EventStart = eventEditEventModel.EventStart; // Corrected assignment
                eventToEdit.EventEnd = eventEditEventModel.EventEnd;
                eventToEdit.EventForUserID = eventEditEventModel.EventForUserID;
            }
    
            await _dbContext.SaveChangesAsync(); // Save changes to the database
    
            return Ok();
        }


        [HttpPut("/{eventid}/finish")]
        public async Task<IActionResult> SetFinishedEvent(int eventid)
        {
            var x = await _dbContext.SaveChangesAsync();
            
            return Ok(x);
        }

        [HttpDelete("/{eventid}/delete")]
        public async Task<IActionResult> DeleteEvent(int eventid)
        {
            var x = await _dbContext.SaveChangesAsync();
            
            return Ok(x);
        }

        [HttpGet("/events")]
        public async Task<IActionResult> EventList()
        {
            var events = await _dbContext.Events.ToListAsync();
            var eventsData = events.Select(e => new
            {
                e.EventID,
                e.EventName,
                e.EventDesc,
                e.EventForUserID,
                e.EventStart,
                e.EventEnd
            }).ToList();

            return Ok(eventsData);
        }
    }
}
