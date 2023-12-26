using ToDoAppWeb.Model;
using ToDoAppWeb.Repository;

namespace ToDoAppWeb.Service
{
    public class CategoryService
    {
        private readonly GenericRepository<categoryTable> _CategoryRepositoryGeneric;
        private readonly CategoryRepository _categoryRepository;
        public CategoryService(GenericRepository<categoryTable> categoryRepositoryGen, CategoryRepository categoryRepository)
        {
            _CategoryRepositoryGeneric = categoryRepositoryGen;
            _categoryRepository = categoryRepository;
        }
        public IQueryable<categoryTable> getCategoryByUserId(int UserID)
        {
            return _categoryRepository.GetCategoriesByUserId(UserID);
        }
        public void addCategory(string category_name, int user_id)
        {
            categoryTable category = new categoryTable();
            category.category_name = category_name;
            category.root_table_username_id = user_id;
            _CategoryRepositoryGeneric.Add(category);
            _CategoryRepositoryGeneric.Save();
        }
        public void deleteCategory(int category_id)
        {
            _CategoryRepositoryGeneric.Delete(_categoryRepository.GetCategoryById(category_id));
            _CategoryRepositoryGeneric.Save();
        }
        public void updateCategory(int category_id, categoryTable updateModel)
        {
            var category = _CategoryRepositoryGeneric.GetByCondition(t => t.category_id == category_id).FirstOrDefault();

            if (category != null)
            {
                category.category_name = updateModel.category_name;
                _CategoryRepositoryGeneric.Update(category);
                _CategoryRepositoryGeneric.Save();
            }
            else
            {
                throw new InvalidOperationException("Task not found");
            }
        }
    }
}
