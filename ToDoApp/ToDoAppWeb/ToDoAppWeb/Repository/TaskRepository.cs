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

        public IQueryable<Model.Task> GetAllTasksByUserId(int userId)
        {
            return _context.tasktable.Where(task => task.root_table_username_id == userId);
        }
        public Model.Task GetTaskById(int taskId)
        {
            return _context.tasktable.Find(taskId);
        }
    }
}
