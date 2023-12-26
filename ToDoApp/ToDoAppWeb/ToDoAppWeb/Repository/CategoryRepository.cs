using Microsoft.EntityFrameworkCore;
using ToDoAppWeb.Model;

namespace ToDoAppWeb.Repository
{
    public class CategoryRepository
    {
         private readonly AppDbContext _dbContext;

         public CategoryRepository(AppDbContext dbContext)
         {
                _dbContext = dbContext;
         }
         public IQueryable<categoryTable> GetCategoriesByUserId(int UserId)
         {
            return _dbContext.category.Where(category => category.root_table_username_id == UserId);
         }
         public categoryTable GetCategoryById(int categoryId)
         {
             return _dbContext.category.Find(categoryId);
         }

    }

}



