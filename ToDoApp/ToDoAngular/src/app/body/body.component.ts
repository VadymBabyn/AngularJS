import { Component, ElementRef, ViewChild,  Output, EventEmitter, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { LeftNavBarComponent } from '../left-nav-bar/left-nav-bar.component';
import { LeftNavBarItemLi } from '../model/left-nav-bar-item.model';
import { LeftNavBarService } from '../service/left-nav-bar.service';
import { TodoApiService } from '../service/todo-api.service';
import { Task } from '../model/task.model';
import { UserApiService } from '../service/user-api.service';
import { LeftNavBarCategory } from '../model/category.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TaskSearchService } from '../service/task-search.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit{
  @ViewChild('contextMenu', { static: false }) contextMenu: ElementRef | undefined;
  @ViewChild('contextMenuDataPicker', { static: false }) contextMenuDataPicker: ElementRef | undefined;
  @ViewChild('myInput') myInput: ElementRef | undefined;

  contextMenuVisibleData = false;
  contextMenuPicker = false;
  contextMenuVisible = false;
  
  ButtonOnTommorow = false;
  ButtonOnAfterTommorow = false;
  ButtonOnTakeData = false;
  showButtons = false;

  showDatePickers = false;
  contextMenuPosition: { top: number; left: number } = { top: 0, left: 0 };
  contextMenuItem: any;
  
  editingTaskId: number | null = null;
  today!: string;
  taskName: string = '';
  searchTextForPipe:string = '';

  filteredTasks: any[] = [];
  TaskList: Task[] = [];
  
  bsConfig!: Partial<BsDatepickerConfig>;
  
  countCompleted:number = 0;

  leftNavBarItems: LeftNavBarItemLi[] = [];
  selectedItem: LeftNavBarItemLi | null = null;
  selectedCategory: LeftNavBarCategory | null = null;
  
  categories: number[] = [1, 2, 3, 4, 5];
  
  constructor(private taskInteractionService: TaskSearchService ,
    private leftNavBarService: LeftNavBarService, 
    private apiService: TodoApiService, 
    private userApiService: UserApiService
  ) {}
  
  ngOnInit() {
    const now = new Date();
    this.today = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

    this.taskInteractionService.searchQuery$.subscribe(searchText => {
      this.performSearch(searchText);
    });

    this.userApiService.getLoggedInStatusObservable().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.TaskList = this.apiService.getTaskList();
        this.countCompleted = this.getCountOfCompletedTask();
      }
    });

    this.leftNavBarService.itemSelected.subscribe((item: LeftNavBarItemLi) => {
      this.selectedItem = item;
      this.selectedCategory = null;
      this.TaskList = this.apiService.getTaskList();
      this.countCompleted = this.getCountOfCompletedTask();
    });

    this.leftNavBarService.CategorySelected.subscribe((item: LeftNavBarCategory) => {
      this.selectedCategory = item;
      this.selectedItem = null;
      this.countCompleted = this.getCountOfCompletedTask();
    });
  }
  
  performSearch(searchText: string): void {  
    this.searchTextForPipe = searchText
    this.selectedItem = null;
    this.selectedCategory = null;
  }

  showDatePicker() {
    this.ClearButtonsData()
    this.showDatePickers = !this.showDatePickers;
    if(this.ButtonOnTakeData)
      this.ButtonOnTakeData=false;
    else
      this.ButtonOnTakeData=true;
  }

  getDataFromApi() {
    const userId = this.userApiService.getUserId();
    if(userId!==-1)
    {
      this.apiService.getData().subscribe(
        data => {
          try {
            this.apiService.setTaskList(data);
            this.TaskList = data;
          } catch (error) {
            console.error('Failed to parse JSON:', error);
          }
        },
        error => {
          console.error('HTTP error:', error);
        }
      );
    }  
  }

  addNewTask(taskName:string, DateCreate:Date, Category_id:number, DataTimeToCompleteTask?:Date)
  {
    if(DataTimeToCompleteTask!==undefined)
    {
      this.apiService.postData(taskName, DateCreate, Category_id,DataTimeToCompleteTask).subscribe(response => {
      this.getDataFromApi();
      }); 
    }else
    {
      this.apiService.postData(taskName, DateCreate, Category_id).subscribe(response => {       
        this.getDataFromApi();
      }); 
    }  
  }

  convertStringToDate(): Date {
    let partes:string =  this.myInput?.nativeElement.value; 
    const parts = partes.split(' ');

    const datePart = parts[0];
    const timePart = parts[1];

    const dateParts = datePart.split('-'); 
    const timeParts = timePart.split(':'); 
    // об'єкт Date, розділені частини як аргументи
    const convertedDate = new Date(
      +dateParts[0], // Рік
      +dateParts[1] - 1, // Місяць (0-11)
      +dateParts[2], // День
      +timeParts[0], // Година
      +timeParts[1], // Хвилина
      +timeParts[2] // Секунда
    );
    return convertedDate;
  }

  onAddButtonClick() {
    const today = new Date();

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(today.getDate() + 2);

    if(this.selectedCategory!==null)
    { 
      if(this.ButtonOnTommorow)
      {
        this.addNewTask(this.taskName, today, this.selectedCategory?.category_id,tomorrow);
      }else if(this.ButtonOnAfterTommorow)
      {
        this.addNewTask(this.taskName, today, this.selectedCategory?.category_id,dayAfterTomorrow);
      }else if(this.ButtonOnTakeData)
      {
        const selectedDateToTask = this.convertStringToDate();
        this.addNewTask(this.taskName, today, this.selectedCategory?.category_id,selectedDateToTask);///Доробити
      }else
      {
        this.addNewTask(this.taskName, today, this.selectedCategory?.category_id);
      }
      this.getDataFromApi(); 
    }else if(this.selectedItem!==null)
    {
      if(this.ButtonOnTommorow)
      {
        this.addNewTask(this.taskName, today, this.selectedItem?.id,tomorrow);
      }else if(this.ButtonOnAfterTommorow)
      {
        this.addNewTask(this.taskName, today, this.selectedItem?.id,dayAfterTomorrow);
      }else if(this.ButtonOnTakeData)
      {
        const selectedDateToTask = this.convertStringToDate();
        this.addNewTask(this.taskName, today, this.selectedItem?.id,selectedDateToTask);///Доробити
      }else
      {
        this.addNewTask(this.taskName, today, this.selectedItem?.id);
      }
      this.getDataFromApi(); 
    }
    this.taskName='';
  }

  
  startWithData()
  { 
    this.ClearButtonsData()
    if(this.showButtons)
    {
      this.showButtons = false;
    }else
    {
      this.showButtons = true;
    }
  }

  taskIsCompleted(Task_Item:Task)
  {
    const today = new Date();
    Task_Item.completed=!Task_Item.completed;
    Task_Item.dataTimeEndTask = today;
    this.apiService.updateTask(Task_Item.task_id, Task_Item).subscribe(response => {
      // Обробка відповіді (якщо потрібно)
      this.getDataFromApi();
      this.countCompleted = this.getCountOfCompletedTask();
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

  @HostListener('document:click', ['$event'])
  handleClick(event: Event): void {
    // Перевірте, чи клік був за межами контекстного меню
    if (!this.contextMenu?.nativeElement.contains(event.target as Node)) {
      this.hideContextMenu();
    }
  }

  showContextMenu(event: MouseEvent, item: any): void {
    event.preventDefault();
    this.contextMenuVisible = true;
    this.contextMenuPosition = { top: event.clientY, left: event.clientX };
    this.contextMenuItem = item;
  }

  hideContextMenu(): void {
    this.contextMenuVisible = false;
  }
  
  showEditMode(taskId: number): void {
    this.editingTaskId = taskId;
  }
  
  getCountOfCompletedTask():number
  {
    let count:number = 0;
    for (let item of this.TaskList)
    {
      if(this.selectedItem?.id===1)
      {
        const currentDate = new Date();
        const taskCreateDate = new Date(item.dataTimeCreateTask);
          if(item.completed&&taskCreateDate.getFullYear() === currentDate.getFullYear() &&
              taskCreateDate.getMonth() === currentDate.getMonth() &&
              taskCreateDate.getDate() === currentDate.getDate())
              {
                count++ 
              }                  
      }else if(this.selectedItem?.id===2)
      {
        if(item.completed&&item.favorite)
          count++ 
                
      }else if(this.selectedItem?.id===5)
      {
        if(item.completed)
          count++ 
      }else
      {
        if(item.completed&&item.category_category_id===this.selectedCategory?.category_id)
          count++ 
      }
      
    }
    return count;
  }
  
  TaskOnTomorrow()
  {
    this.ClearButtonsData()
    if(this.ButtonOnTommorow)
      this.ButtonOnTommorow=false;
    else
      this.ButtonOnTommorow=true;
  }
  
  TaskOnAfterTomorrow()
  {
    this.ClearButtonsData()
    if(this.ButtonOnAfterTommorow)
      this.ButtonOnAfterTommorow=false;
    else
      this.ButtonOnAfterTommorow=true;
  }
  
  ClearButtonsData()
  {
    this.showDatePickers = false;
    this.ButtonOnTakeData=false;
    this.ButtonOnTommorow=false;
    this.ButtonOnAfterTommorow=false;
  }
 
  saveTaskChanges(item: any): void {
    this.apiService.updateTask(item.task_id, item).subscribe(response => {
      console.log(response)
      this.getDataFromApi();
    }); 
    this.editingTaskId = null;
  }
  
  editTask(item: any): void {
    this.showEditMode(item.task_id)
    console.log('Edit task:', item);
    this.hideContextMenu();
  }
  
  deleteTask(item: any): void {
    this.apiService.deleteTask(item.task_id).subscribe(response => {
      console.log(response)
      this.getDataFromApi();
    }); 
    console.log('Delete task:', item);
    this.hideContextMenu();
  }

  getFormattedDate(elseDate?:Date): string {
    const options = { weekday: "long", day: 'short', month: 'long' };
    if(elseDate===undefined)
    {
      const today = new Date();
      const dateFormatted = new Intl.DateTimeFormat('en-US',{weekday: "long", day:"2-digit", month:"long"}).format(today);
      return dateFormatted; 
    }else
    {
      const today = new Date(elseDate);
      const dateFormatted = new Intl.DateTimeFormat('en-US',{weekday: "long",  day:"2-digit", month:"long", year:"numeric"}).format(today);
      return dateFormatted; 
    }
    
  }
}
