using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoAppWeb.Service;
using ToDoAppWeb.Model;
using System.Diagnostics.CodeAnalysis;

namespace ToDoAppWeb.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _categoryService;

        public CategoryController(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("{userID}")]
        public IActionResult Get(int userID)
        {
            IQueryable<categoryTable> CategoryList = _categoryService.getCategoryByUserId(userID);
            return Ok(CategoryList);
        }

        [HttpPost]
        public IActionResult Post(categoryTable category)
        {
            _categoryService.addCategory(category.category_name, category.root_table_username_id);
            return Ok(200);
        }

        [HttpDelete("{categoryId}")]
        public IActionResult DeleteCategory(int categoryId)
        {
            try
            {
                _categoryService.deleteCategory(categoryId);
                return Ok(200);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{categoryId}")]
        public IActionResult Put(int categoryId, categoryTable CategoryUpdateModel)
        {
            try
            {
                _categoryService.updateCategory(categoryId, CategoryUpdateModel);
                return Ok(200);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to update category: {ex.Message}");
            }
        }
    }
}
