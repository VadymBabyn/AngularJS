using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoAppWeb.Service;
using ToDoAppWeb.Model;
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
            return Ok("Get working");
        }
        [HttpPost]
        public IActionResult Post(Model.Task taskName)
        {
            _taskService.addTask(taskName.taskName);
            return Ok("Task added in DB");
        }
    }
}
