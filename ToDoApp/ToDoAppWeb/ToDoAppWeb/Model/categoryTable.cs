using System.ComponentModel.DataAnnotations;

namespace ToDoAppWeb.Model
{
    public class categoryTable
    {

        [Key]
        public int category_id { get; set; }
        [Required]
        public string category_name { get; set; }
        [Required]
        public int root_table_username_id { get; set; }
        public  categoryTable() { 
        }
        public categoryTable(int category_id, string category_name, int root_table_username_id)
        {
            this.category_id = category_id;
            this.category_name = category_name;
            this.root_table_username_id = root_table_username_id;
        }
    }
}
