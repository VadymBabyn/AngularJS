using ToDoAppWeb.Repository;
using ToDoAppWeb.Model;
namespace ToDoAppWeb.Service
{
    public class TaskService
    {
        private readonly TaskRepository _taskRepository;

        public TaskService(TaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public void addTask(string TaskName) 
        {
            Model.Task task = new Model.Task();
            task.taskName = TaskName;
            task.root_table_username_id = 5;
            _taskRepository.AddTask(task);
        }
        public List<Model.Task> getAllTasktoUser() 
        {
            List<Model.Task> tasklist = new List<Model.Task>();
            tasklist = _taskRepository.GetAllTasks();
            return tasklist;
        }
    }
}
