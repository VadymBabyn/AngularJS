using System.ComponentModel.DataAnnotations;

namespace ToDoAppWeb.Model
{
    public class userTable
    {
        [Key]
        public int username_id { get; set; }
        [Required]
        public string user_login { get; set; }

        [Required]
        public string password { get; set; }
        public userTable() 
        {
        }
        public userTable(int username_id, string user_login, string password)
        {
            this.username_id = username_id;
            this.user_login = user_login;
            this.password = password;
        }
    }
}
