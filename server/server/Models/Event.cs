using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class Event
{
    [Key]
    public int EventID { get; set; }
    public string EventName { get; set; }
    public string EventDesc { get; set; }
    public DateTime EventCreatedAt { get; set; }
    public DateTime EventEditedAt { get; set; }
    public bool EventFinished { get; set; }
    public int EventForUserID { get; set; }
    
    public Event(){}
    
    public Event(EventCreateEvent eventCreateEvent)
    {
        EventName = eventCreateEvent.EventName;
        EventDesc = eventCreateEvent.EventDesc;
        EventForUserID = eventCreateEvent.EventForUserID;
        EventCreatedAt = DateTime.Now;
        EventFinished = false;
    }
}

public class EventCreateEvent
{
    [Required]
    public string EventName { get; set; }
    [Required]
    public string EventDesc { get; set; }
    [Required]
    public int EventForUserID { get; set; }
}