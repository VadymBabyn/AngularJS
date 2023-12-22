import { Component, ElementRef, ViewChild,  Output, EventEmitter, OnInit,ChangeDetectorRef } from '@angular/core';
import { LeftNavBarComponent } from '../left-nav-bar/left-nav-bar.component';
import { LeftNavBarItemLi } from '../model/left-nav-bar-item.model';
import { LeftNavBarService } from '../service/left-nav-bar.service';
import { TodoApiService } from '../service/todo-api.service';
import { Task } from '../model/task.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit{
  taskName: string = '';

  TaskList: Task[] = [];

  leftNavBarItems: LeftNavBarItemLi[] = [];
  
  selectedItem: LeftNavBarItemLi | null = null;
  
  categories: number[] = [1, 2, 3, 4, 5];
  
  constructor(private leftNavBarService: LeftNavBarService, private apiService: TodoApiService) {}

  ngOnInit() {
    this.leftNavBarService.itemSelected.subscribe((item: LeftNavBarItemLi) => {
      this.selectedItem = item;
    });
    this.getDataFromApi();
  }
  
  getDataFromApi() {
    this.apiService.getData().subscribe(
      data => {
        try {
          this.TaskList = data;
          console.log(this.TaskList[0].completed);
        } catch (error) {
          console.error('Failed to parse JSON:', error);
        }
      },
      error => {
        console.error('HTTP error:', error);
      }
    );
  }

  onAddButtonClick() {
    const today = new Date();
    this.apiService.postData(this.taskName, today).subscribe(response => {
      // Обробка відповіді (якщо потрібно)
      this.getDataFromApi();
    }); 
    
  }
  taskIsCompleted(Task_Item:Task)
  {
    const today = new Date();
    Task_Item.completed=!Task_Item.completed;
    Task_Item.dataTimeEndTask = today;
    this.apiService.updateTask(Task_Item.task_id, Task_Item).subscribe(response => {
      // Обробка відповіді (якщо потрібно)
      this.getDataFromApi();
    }); 
  }
  taskIsFavorite(Task_Item:Task)
  {
    Task_Item.favorite=!Task_Item.favorite;
    this.apiService.updateTask(Task_Item.task_id, Task_Item).subscribe(response => {
      // Обробка відповіді (якщо потрібно)
      this.getDataFromApi();
    }); 
  }

  toggleLeftNavBar() {
    var element = document.getElementById("leftBar");
    var elementsecond = document.getElementById("under-menu-icon-btn");
    var elementthird = document.getElementById("snowflake-imgBody");
    if (element !== null && elementsecond!==null && elementthird!==null) {
      // Приховуємо елемент
      if(element.style.display === "none")
      {
        element.style.display = "flex";
        elementsecond.style.display= "none";
        elementthird.style.display = "flex";
      }else 
      {
        element.style.display = "none";
        elementsecond.style.display = "flex";
        elementthird.style.display = "none";
      }
      console.log("display changed")
    }
  }
  
  getFormattedDate(): string {
    const options = { weekday: "long", day: 'short', month: 'long' };
    const today = new Date();
    const dateFormatted = new Intl.DateTimeFormat('en-US',{weekday: "long", day:"2-digit", month:"long"}).format(today);
    return dateFormatted; 
  }
}
