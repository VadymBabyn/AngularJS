import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/task.model';

@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {
  transform(tasks: Task[], selectedItem?: number, selectCategory?: number, searchText?:string): Task[] {
    if(selectedItem!==null)
    {
      if (selectedItem === 5) {
        return tasks; // Повертаємо всі таски, якщо вибрана категорія "Task"
      }
      else if(selectedItem === 1|| selectedItem===null) 
      {
        const currentDate = new Date();

        const todayTasks = tasks.filter(task => {

        const taskCreateDate = new Date(task.dataTimeCreateTask);
          
        return (
            taskCreateDate.getFullYear() === currentDate.getFullYear() &&
            taskCreateDate.getMonth() === currentDate.getMonth() &&
            taskCreateDate.getDate() === currentDate.getDate()
        );
        });          
        return todayTasks;
      } 
      else if(selectedItem === 2) { 
        return tasks.filter(task => task.favorite === true);
      }
      else if(selectedItem === 3)
      {
          const currentDate = new Date();

          const todayTasks = tasks.filter(task => {

          const taskToCompleteDate = new Date(task.dataTimeToCompleteTask);
          
          return (
            currentDate<taskToCompleteDate
          );
          });
          return todayTasks;
      }else 
      {
          return tasks.filter(task => task.category_category_id === selectedItem);
      }
    }
    else if(selectCategory!==null){
      return tasks.filter(task => task.category_category_id === selectCategory);
    }
    else 
    {
      if(searchText!==null&&searchText!==undefined&&searchText!=='')
      {
        return tasks.filter(task =>
        task.taskName.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      return tasks; // Повертаємо всі таски, ніякі категорії не вибрані та пошук не заповнено
    }
  }
}
