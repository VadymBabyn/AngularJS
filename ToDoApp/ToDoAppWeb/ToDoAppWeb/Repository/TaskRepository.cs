using Microsoft.EntityFrameworkCore;
using ToDoAppWeb.Model;
using System.Collections.Generic;
using System.Linq;

namespace ToDoAppWeb.Repository
{
    public class TaskRepository
    {
        private readonly AppDbContext _context;

        public TaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Model.Task> GetAllTasks()
        {
            return _context.tasktable.ToList();
        }

        public Model.Task GetTaskById(int taskId)
        {
            return _context.tasktable.Find(taskId);
        }

        public void AddTask(Model.Task task)
        {
            _context.tasktable.Add(task);
            _context.SaveChanges();
        }

        public void UpdateTask(Model.Task task)
        {
            _context.Entry(task).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteTask(int taskId)
        {
            var task = _context.tasktable.Find(taskId);
            if (task != null)
            {
                _context.tasktable.Remove(task);
                _context.SaveChanges();
            }
        }
    }
}
