using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;

namespace serverV2.Models
{
    public class Task
    {
        [Key]
        public int TaskId { get; set; }
        public string TaskName { get; set; }
        public string TaskDesc { get; set; }
        public DateTime TaskCreatedAt { get; set; }
        public DateTime TaskEditedAt { get; set; }
        public DateTime TaskStart { get; set; }
        public DateTime TaskEnd { get; set; }
        public bool TaskFinished { get; set; }

        public Task() { }
        public Task(TaskCreateTaskModel taskCreateTaskModel)
        {
            TaskName = taskCreateTaskModel.TaskName;
            TaskDesc = taskCreateTaskModel.TaskDesc;
            TaskCreatedAt = DateTime.Now;
            TaskStart = taskCreateTaskModel.TaskStart;
            TaskEnd = taskCreateTaskModel.TaskEnd;
            TaskFinished = false;
        }

        public Task(TaskEditTaskModel taskEditTaskModel)
        {
            TaskName = taskEditTaskModel.TaskName;
            TaskDesc = taskEditTaskModel.TaskDesc;
            TaskCreatedAt = DateTime.Now;
            TaskStart = taskEditTaskModel.TaskStart;
            TaskEnd = taskEditTaskModel.TaskEnd;
        }

        public string FormattedEventCreatedAt => TaskCreatedAt.ToString("dd.MM.yyyy HH:mm");
        public string FormattedEventEditedAt => TaskEditedAt.ToString("dd.MM.yyyy HH:mm");
        public string FormattedEventStart => TaskStart.ToString("dd.MM.yyyy HH:mm");
        public string FormattedEventEnd => TaskEnd.ToString("dd.MM.yyyy HH:mm");
    }
    public class TaskCreateTaskModel
    {
        [Required]
        public string TaskName { get; set; }
        [Required]
        public string TaskDesc { get; set; }
        [Required]
        public DateTime TaskStart { get; set; }
        [Required]
        public DateTime TaskEnd { get; set; }
    }

    public class TaskEditTaskModel
    {
        [Required]
        public string TaskName { get; set; }
        [Required]
        public string TaskDesc { get; set; }
        [Required]
        public DateTime TaskStart { get; set; }
        [Required]
        public DateTime TaskEnd { get; set; }
    }
}
