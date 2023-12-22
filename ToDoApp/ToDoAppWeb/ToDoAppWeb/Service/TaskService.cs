using ToDoAppWeb.Repository;
using ToDoAppWeb.Model;
using System.Data;

namespace ToDoAppWeb.Service
{
    public class TaskService
    {
        
        private readonly GenericRepository<Model.Task> _taskRepository;
        public TaskService(GenericRepository<Model.Task> taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public void addTask(string TaskName) 
        {
            Model.Task task = new Model.Task();
            task.taskName = TaskName;
            task.root_table_username_id = 5;
            _taskRepository.Add(task);
            _taskRepository.Save();
        }
        public void addTask(string TaskName, DateTime CreateTask)
        {
            Model.Task task = new Model.Task();
            task.taskName = TaskName;
            task.dataTimeCreateTask = CreateTask;
            task.root_table_username_id = 5;
            task.category_category_id = 5;
            _taskRepository.Add(task);
            _taskRepository.Save();
        }
        public IQueryable<Model.Task> getAllTasktoUser() 
        {
            IQueryable<Model.Task> tasklist = _taskRepository.GetAll();
            return tasklist;
        }
        public void updateTask(int taskId, Model.Task updateModel)
        {
            var task = _taskRepository.GetByCondition(t => t.Task_id == taskId).FirstOrDefault();

            if (task != null)
            {                
                task.completed = updateModel.completed;
               
                task.Favorite = updateModel.Favorite;
                
                task.dataTimeEndTask = updateModel.dataTimeEndTask;

                _taskRepository.Update(task);
                _taskRepository.Save();
            }
            else
            {
                throw new InvalidOperationException("Task not found");
            }
        }

    }
}
