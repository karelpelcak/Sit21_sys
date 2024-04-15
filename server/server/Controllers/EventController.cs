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
            if (createEventModel.EventEnd <= createEventModel.EventStart)
            {
                return BadRequest("End time must be greater than start time.");
            }

            var checkEvent = await _dbContext.Events.FirstOrDefaultAsync(e =>
                e.EventName == createEventModel.EventName && e.EventDesc == createEventModel.EventDesc &&
                e.EventStart == createEventModel.EventStart && e.EventEnd == createEventModel.EventEnd);
    
            if (checkEvent != null)
            {
                return BadRequest("Event already exists.");
            }

            var newEvent = new Event(createEventModel);
            _dbContext.Events.Add(newEvent);
            await _dbContext.SaveChangesAsync();


            var eventToFind = await _dbContext.Events.FirstOrDefaultAsync(e => e == newEvent);
            if (eventToFind != null)
            {
                var eventUsers = ids.Select(id => new EventUser(id, eventToFind.EventID));
                _dbContext.EventUsers.AddRange(eventUsers);
                try
                {
                    await _dbContext.SaveChangesAsync();
                    return Ok("event and user mange created ok");
                }
                catch (Exception err)
                {
                    return BadRequest(err);
                }
            }
            else
            {
                return BadRequest("event not created");
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
                eventToEdit.EventStart = eventEditEventModel.EventStart;
                eventToEdit.EventEnd = eventEditEventModel.EventEnd;
            }
    
            await _dbContext.SaveChangesAsync(); 
    
            return Ok();
        }


        [HttpPut("/{eventid}/finish")]
        public async Task<IActionResult> SetFinishedEvent(int eventid)
        {
            var eventToFinish = await _dbContext.Events.FirstOrDefaultAsync(e => e.EventID == eventid);
            if (eventToFinish != null)
            {
                return Ok(eventToFinish);
            }
            else
            {
                return StatusCode(404);
            }
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
                e.EventStart,
                e.EventEnd
            }).ToList();

            return Ok(eventsData);
        }
    }
}
