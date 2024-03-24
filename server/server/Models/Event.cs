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
    public int EventForUserID { get; set; }
    
    public Event(){}
    
    public Event(EventCreateEventModel eventCreateEventModel)
    {
        EventName = eventCreateEventModel.EventName;
        EventDesc = eventCreateEventModel.EventDesc;
        EventForUserID = eventCreateEventModel.EventForUserID;
        EventCreatedAt = DateTime.Now;
        EventStart = eventCreateEventModel.EventStart;
        EventEnd = eventCreateEventModel.EventEnd;
        EventFinished = false;
    }

    public Event(EventEditEventModel eventEditEventModel)
    {
        EventName = eventEditEventModel.EventName;
        EventDesc = eventEditEventModel.EventDesc;
        EventForUserID = eventEditEventModel.EventForUserID;
        EventEditedAt = DateTime.Now;
        EventStart = eventEditEventModel.EventStart;
        EventEnd = eventEditEventModel.EventEnd;
    }
}

public class EventCreateEventModel
{
    [Required]
    public string EventName { get; }
    [Required]
    public string EventDesc { get; }
    [Required]
    public int EventForUserID { get; }
    [Required]
    public DateTime EventStart { get; }
    [Required]
    public DateTime EventEnd { get; }
}

public class EventEditEventModel
{
    [Required]
    public string EventName { get; }
    [Required]
    public string EventDesc { get;  }
    [Required]
    public int EventForUserID { get; }
    [Required]
    public DateTime EventStart { get;  }
    [Required]
    public DateTime EventEnd { get;  }
}