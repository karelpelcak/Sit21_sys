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
        public async Task<IActionResult> EditEvent(int idOfEvent, [FromBody] EventEditEventModel eventEditEventModel)
{
    if (eventEditEventModel == null)
    {
        return BadRequest("Invalid event data.");
    }

    var eventToEdit = await _dbContext.Events.FirstOrDefaultAsync(e => e.EventID == idOfEvent);

    if (eventToEdit == null)
    {
        return NotFound("Event not found.");
    }

    if (eventToEdit.EventFinished)
    {
        return BadRequest("You can't change a finished event.");
    }

    if (!string.IsNullOrEmpty(eventEditEventModel.EventName))
    {
        eventToEdit.EventName = eventEditEventModel.EventName;
    }

    if (!string.IsNullOrEmpty(eventEditEventModel.EventDesc))
    {
        eventToEdit.EventDesc = eventEditEventModel.EventDesc;
    }

    if (!string.IsNullOrEmpty(eventEditEventModel.EventStart.ToString()))
    {
        if (DateTime.TryParse(eventEditEventModel.EventStart.ToString(), out DateTime eventStartDate))
        {
            eventToEdit.EventStart = eventStartDate;
        }
        else
        {
            return BadRequest("Invalid event start date format.");
        }
    }

    if (!string.IsNullOrEmpty(eventEditEventModel.EventEnd.ToString()))
    {
        if (DateTime.TryParse(eventEditEventModel.EventEnd.ToString(), out DateTime eventEndDate))
        {
            eventToEdit.EventEnd = eventEndDate;
        }
        else
        {
            return BadRequest("Invalid event end date format.");
        }
    }

    try
    {
        await _dbContext.SaveChangesAsync();
        return Ok("Event changed");
    }
    catch (DbUpdateConcurrencyException)
    { 
        return Conflict("Concurrency conflict occurred while updating the event. Please try again.");
    }
    catch (Exception ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating the event.");
    }
}
        
        [HttpPut("/{eventid}/finish")]
        public async Task<IActionResult> SetFinishedEvent(int eventid)
        {
            var eventToFinish = await _dbContext.Events.FirstOrDefaultAsync(e => e.EventID == eventid);
            if (eventToFinish != null)
            {
                eventToFinish.EventFinished = true;
                await _dbContext.SaveChangesAsync();
                return Ok("event is finished");
            }
            else
            {
                return StatusCode(404);
            }
        }

        [HttpDelete("/{eventid}/delete")]
        public async Task<IActionResult> DeleteEvent(int eventid)
        {
            try
            {
                var eventToDelete = await _dbContext.Events.FirstOrDefaultAsync(e => e.EventID == eventid);
                if (eventToDelete == null)
                {
                    return NotFound();
                }

                _dbContext.Events.Remove(eventToDelete);
                await _dbContext.SaveChangesAsync();

                return Ok("smazano");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Chyba při mazání události: {ex.Message}");
            }
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
            
        [HttpGet("/events/today/{hashid}")]
        public async Task<IActionResult> EventTodayByUserId(string hashid)
        {
            List<Event> eventlist = new List<Event>();
    
            var eventid = await _dbContext.HashIds.FirstOrDefaultAsync(h => h.HashedID == hashid);
            if (eventid != null)
            {
                var eventUserIds = await _dbContext.EventUsers
                    .Where(eu => eu.UserId == eventid.UserID)
                    .Select(eu => eu.EventId)
                    .ToListAsync();
        
                foreach (var eventId in eventUserIds)
                {
                    var @event = await _dbContext.Events.FirstOrDefaultAsync(e => e.EventID == eventId && e.EventStart.Date == DateTime.Today);
                    if (@event != null)
                    {
                        if (@event.EventFinished == false)
                        {
                            eventlist.Add(@event);
                        }
                    }
                }
        
                return Ok(eventlist);
            }
            else
            {
                return BadRequest("Wrong hash");
            }
        }
    }
}

