using System.ComponentModel.DataAnnotations;

namespace ToDoAppWeb.Model
{
    public class Task
    {
        [Key]
        public int task_id { get; set; }
        [Required]
        public int root_table_username_id { get; set; }
        
        [Required]
        public string taskName { get; set; }

        public bool completed { get; set; }

        public bool favorite { get; set; }

        public DateTime dataTimeCreateTask { get; set; }

        public DateTime dataTimeEndTask { get; set; }

        public DateTime dataTimeToCompleteTask { get; set; }
        public int category_category_id { get; set; }
        public Task() 
        {

        }
        public Task(int Task_id, int id, string taskName, bool completed, bool favorite, DateTime dataTimeCreateTask, DateTime dataTimeEndTask, DateTime dataTimeToCompleteTask, int category_category_id)
        {
            this.task_id = Task_id;
            this.root_table_username_id = id;
            this.taskName = taskName;
            this.completed = completed;
            this.favorite = favorite;
            this.dataTimeCreateTask = dataTimeCreateTask;
            this.dataTimeEndTask = dataTimeEndTask;
            this.dataTimeToCompleteTask = dataTimeToCompleteTask;
            this.category_category_id = category_category_id;
        }
    }
}
