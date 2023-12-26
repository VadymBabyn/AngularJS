using ToDoAppWeb.Repository;
using ToDoAppWeb.Model;
using System.Data;

namespace ToDoAppWeb.Service
{
    public class TaskService
    {
        private readonly GenericRepository<Model.Task> _taskRepositoryGeneric;
        private readonly TaskRepository _taskRepository;
        public TaskService(GenericRepository<Model.Task> taskRepositoryGen, TaskRepository taskRepository)
        {
            _taskRepositoryGeneric = taskRepositoryGen;
            _taskRepository = taskRepository;
        }

        public void addTask(string TaskName, DateTime CreateTask, int user_id, bool favorite, int category_Id, DateTime dataTimeToCompleteTask)
        {
            Model.Task task = new Model.Task();
            task.taskName = TaskName;
            task.dataTimeCreateTask = CreateTask;
            task.root_table_username_id = user_id;
            task.favorite = favorite;
            task.category_category_id = category_Id;
            task.dataTimeToCompleteTask = dataTimeToCompleteTask;
            _taskRepositoryGeneric.Add(task);
            _taskRepositoryGeneric.Save();
        }
        public IQueryable<Model.Task> getAllTask() 
        {
            IQueryable<Model.Task> tasklist = _taskRepositoryGeneric.GetAll();
            return tasklist;
        }
        public IQueryable<Model.Task> getAllTaskByIdUser(int userId)
        {
            IQueryable<Model.Task> tasklist = _taskRepository.GetAllTasksByUserId(userId);
            return tasklist;
        }
        public void updateTask(int taskId, Model.Task updateModel)
        {
            var task = _taskRepositoryGeneric.GetByCondition(t => t.task_id == taskId).FirstOrDefault();

            if (task != null)
            {
                task.taskName = updateModel.taskName;
                task.completed = updateModel.completed;
               
                task.favorite = updateModel.favorite;
                
                task.dataTimeEndTask = updateModel.dataTimeEndTask;

                _taskRepositoryGeneric.Update(task);
                _taskRepositoryGeneric.Save();
            }
            else
            {
                throw new InvalidOperationException("Task not found");
            }
        }
        public void deleteTask(int task_id) 
        {
            _taskRepositoryGeneric.Delete(_taskRepository.GetTaskById(task_id));
            _taskRepositoryGeneric.Save();
        }
    }
}
