using System.ComponentModel.DataAnnotations;

namespace ToDoAppWeb.Model
{
    public class Task
    {
        [Key]
        public int Task_id { get; set; }
        [Required]
        public int root_table_username_id { get; set; }
        
        [Required]
        public string taskName { get; set; }

        public bool completed { get; set; }

        public bool Favorite { get; set; }

        public DateTime dataTimeCreateTask { get; set; }

        public DateTime dataTimeEndTask { get; set; }

        public DateTime dataTimeToCompleteTask { get; set; }
        public Task() 
        {

        }
        public Task(int Task_id, int id, string taskName, bool completed, bool favorite, DateTime dataTimeCreateTask, DateTime dataTimeEndTask, DateTime dataTimeToCompleteTask)
        {
            this.Task_id = Task_id;
            this.root_table_username_id = id;
            this.taskName = taskName;
            this.completed = completed;
            this.Favorite = favorite;
            this.dataTimeCreateTask = dataTimeCreateTask;
            this.dataTimeEndTask = dataTimeEndTask;
            this.dataTimeToCompleteTask = dataTimeToCompleteTask;
        }
    }
}
