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
    public DateTime EventStart { get; set;}
    public DateTime EventEnd { get; set;}
    public bool EventFinished { get; set; }
    
    public Event(){}
    
    public Event(EventCreateEventModel eventCreateEventModel)
    {
        EventName = eventCreateEventModel.EventName;
        EventDesc = eventCreateEventModel.EventDesc;
        EventCreatedAt = DateTime.Now;
        EventStart = eventCreateEventModel.EventStart;
        EventEnd = eventCreateEventModel.EventEnd;
        EventFinished = false;
    }

    public Event(EventEditEventModel eventEditEventModel)
    {
        EventName = eventEditEventModel.EventName;
        EventDesc = eventEditEventModel.EventDesc;
        EventEditedAt = DateTime.Now;
        EventStart = eventEditEventModel.EventStart;
        EventEnd = eventEditEventModel.EventEnd;
    }
    public ICollection<EventUser> EventUsers { get; set; }
}

public class EventCreateEventModel
{
    [Required]
    public string EventName { get; set; }
    [Required]
    public string EventDesc { get; set;}
    [Required]
    public DateTime EventStart { get; set;}
    [Required]
    public DateTime EventEnd { get; set;}
}

public class EventEditEventModel
{
    [Required]
    public string EventName { get; set;}
    [Required]
    public string EventDesc { get;  set;}
    [Required]
    public DateTime EventStart { get;  set;}
    [Required]
    public DateTime EventEnd { get;  set;}
}