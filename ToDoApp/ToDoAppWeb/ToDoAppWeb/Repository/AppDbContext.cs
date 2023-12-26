using Microsoft.EntityFrameworkCore;
using ToDoAppWeb.Model;

namespace ToDoAppWeb.Repository
{
    

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<categoryTable> category { get; set; }
        public DbSet<userTable> root_table { get; set; }
        public DbSet<Model.Task> tasktable { get; set; }
    }
}
