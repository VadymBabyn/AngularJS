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
        [HttpGet]
        public IActionResult Get()
        {
            IQueryable<Model.Task> tasksList = _taskService.getAllTasktoUser();        
            return Ok(tasksList);
                           
        }
        [HttpPost]
        public IActionResult Post(Model.Task taskName)
        {
            _taskService.addTask(taskName.taskName, taskName.dataTimeToCompleteTask);
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
    }
}
