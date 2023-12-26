using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoAppWeb.Service;
using ToDoAppWeb.Model;
using System.Diagnostics.CodeAnalysis;
using ToDoAppWeb.Repository;

namespace ToDoAppWeb.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController:ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public ActionResult<int> Login([FromBody] userTable loginRequest)
        {
            int userId = _userService.getUserId(loginRequest.user_login, loginRequest.password);
            return Ok(userId);
        }

        [HttpPost("register")]
        public ActionResult<int> Register([FromBody] userTable loginRequest)
        {
            int user = _userService.addNewUser(loginRequest.user_login, loginRequest.password);

            if (user != -1)
            {
                return Ok(user);
            }

            return NotFound("This login already exist");
        }
    }
}
