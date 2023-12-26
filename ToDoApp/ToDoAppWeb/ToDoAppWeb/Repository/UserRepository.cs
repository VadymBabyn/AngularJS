using ToDoAppWeb.Model;

namespace ToDoAppWeb.Repository
{
    public class UserRepository
    {
        private readonly AppDbContext _dbContext;

        public UserRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public int RegisterUser(string login, string password)
        {
            // Перевірка, чи існує користувач з таким логіном
            if (_dbContext.root_table.Any(u => u.user_login == login))
            {
                // Користувач із вказаним логіном вже існує
                return -1; // або інший код, що вказує на конфлікт
            }

            // Створення нового користувача
            var newUser = new userTable
            {
                user_login = login,
                password = password
            };

            // Додавання користувача до бази даних
            _dbContext.root_table.Add(newUser);
            _dbContext.SaveChanges();

            // Повернення ідентифікатора нового користувача
            return newUser.username_id;
        }

        public int AuthenticateUser(string login, string password)
        {
            // Пошук користувача за логіном і паролем
            var user = _dbContext.root_table.FirstOrDefault(u => u.user_login == login && u.password == password);

            // Перевірка, чи знайдено користувача
            if (user != null)
            {
                // Повернення ідентифікатора користувача
                return user.username_id;
            }

            // Повернення -1 або іншого значення, яке вказує на помилку автентифікації
            return -1;
        }
    }

}
