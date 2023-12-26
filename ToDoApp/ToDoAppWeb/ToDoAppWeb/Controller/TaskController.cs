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
    public class TaskController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TaskController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet("{userID}")]
        public IActionResult Get(int userID)
        {
            IQueryable<Model.Task> tasksList = _taskService.getAllTaskByIdUser(userID);        
            return Ok(tasksList);                           
        }
        
        [HttpPost]
        public IActionResult Post(Model.Task taskName)
        {
            
            _taskService.addTask(taskName.taskName, taskName.dataTimeCreateTask, taskName.root_table_username_id, taskName.favorite, taskName.category_category_id,taskName.dataTimeToCompleteTask);           
            return Ok(200);
        }
        
        [HttpPut("{taskId}")]
        public IActionResult Put(int taskId, Model.Task taskName)
        {
            try
            {
                _taskService.updateTask(taskId, taskName);
                return Ok(200);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to update task: {ex.Message}");
            }
        }
        
        [HttpDelete("{taskId}")]
        public IActionResult DeleteTask(int taskId)
        {
            try
            {
                _taskService.deleteTask(taskId);
                return Ok(200);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
