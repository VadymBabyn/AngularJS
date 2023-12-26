using ToDoAppWeb.Repository;
using ToDoAppWeb.Model;
using System.Data;

namespace ToDoAppWeb.Service
{
    
    public class UserService
    {
        private readonly UserRepository _userRepository;
        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public int addNewUser(string Login,string password)
        {
            int result = _userRepository.RegisterUser(Login, password);
            return result;
        }
        public int getUserId(string Login, string password)
        {
            int result = _userRepository.AuthenticateUser(Login, password);
            return result;
        }

    }
}
