using Microsoft.EntityFrameworkCore;
using ToDoAppWeb.Model;

namespace ToDoAppWeb.Repository
{
    

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Model.Task> tasktable { get; set; }
    }
}
