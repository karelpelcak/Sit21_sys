using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class EventUser
    {
        [Key]
        public int EventUserId { get; set; }
        public int UserId { get; set; }
        public int EventId { get; set; }
        
        public EventUser() { }

        public EventUser(int id, int eventId)
        {
            UserId = id;
            EventId = eventId;
        }

        public User User { get; set; }
        public Event Event { get; set; }
    }
}