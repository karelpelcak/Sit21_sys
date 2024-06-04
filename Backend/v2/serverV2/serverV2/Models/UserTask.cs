using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace serverV2.Models
{
    public class UserTask
    {
        [Key]
        public int UserTaskId { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }

        [Required]
        public int TaskId { get; set; }

        [ForeignKey("EventId")]
        public virtual Task Task { get; set; }

        public UserTask() { }

        public UserTask(int userId, int taskId)
        {
            UserId = userId;
            TaskId = taskId;
        }
    }
}
