import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/task.model';

@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {
  transform(tasks: Task[], selectedItem?: number): Task[] {
    if (selectedItem === 5) {
      return tasks; // Повертаємо всі таски, якщо вибрана категорія "Task"
    }else if(selectedItem === 1|| selectedItem===null) {
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
    }else 
    {
        return tasks.filter(task => task.category_category_id === selectedItem);
    }
  }
}
