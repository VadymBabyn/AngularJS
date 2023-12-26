import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { LeftNavBarItemLi } from '../model/left-nav-bar-item.model';
import { LeftNavBarService } from '../service/left-nav-bar.service';
import { LeftNavBarCategory } from '../model/category.model';
import { CategoryApiService } from '../service/category-api.service';
import { UserApiService } from '../service/user-api.service';
import { TodoApiService } from '../service/todo-api.service';

@Component({
  selector: 'app-left-nav-bar',
  templateUrl: './left-nav-bar.component.html',
  styleUrl: './left-nav-bar.component.css',
})

export class LeftNavBarComponent {
  @ViewChild('contextMenu', { static: false }) contextMenu: ElementRef | undefined;
  
  contextMenuVisible = false;
  contextMenuPosition: { top: number; left: number } = { top: 0, left: 0 };
  contextMenuItem: any;

  editingCategoryId: number | null = null;

  isNavBarHidden = false; 
  
  selectedItem: LeftNavBarItemLi | null = null;
  selectedCategory: LeftNavBarCategory | null = null;
  
  categoryName:  string = '';
  category: LeftNavBarCategory[] = [];
  
  constructor(private leftNavBarService: LeftNavBarService,
    private categoryApiService: CategoryApiService,
    private userApiService: UserApiService,
    private apiService: TodoApiService) {
    this.userApiService.getLoggedInStatusObservable().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.GetCategory();
      }
    });
    this.leftNavBarService.itemSelected.subscribe((item: LeftNavBarItemLi) => {
      this.selectedItem = item;
      this.selectedCategory = null;
    });
    this.leftNavBarService.CategorySelected.subscribe((item: LeftNavBarCategory) => {
      this.selectedCategory = item;
      this.selectedItem = null;
    });
  }

  AddNewCategory()
  {
    this.categoryApiService.postCategory(this.categoryName).subscribe(response => {
      console.log(response);
      this.GetCategory();
    }); 
    this.categoryName='';
  }
  
  GetCategory()
  {
    this.categoryApiService.getCategory().subscribe(
      data => {
        try {
          this.category = data;
        } catch (error) {
          console.error('Failed to parse JSON:', error);
        }
      },
      error => {
        console.error('HTTP error:', error);
      }
    );
  }  
  
  left_nav_barToggle() {
    var element = document.getElementById("leftBar");
    var elementsecond = document.getElementById("under-menu-icon-btn");
    var elementthird = document.getElementById("snowflake-imgBody");
    if (element !== null && elementsecond!==null && elementthird!==null) {
      // Приховуємо елемент
      if(element.style.display === "none")
      {
        element.style.display = "flex";
        elementsecond.style.display= "none";
        elementthird.style.display = "block";
      }else 
      {
        element.style.display = "none";
        elementsecond.style.display = "block";
        elementthird.style.display = "none";
      }     
      console.log("display changed")
      // Повертаємо видимість елементу     
    }
  }
  
  @Output() itemSelected = new EventEmitter<LeftNavBarItemLi>();
  SelectedItemLi: LeftNavBarItemLi = { id: 1, label: 'My Day', idLi: "myDayli",imgsrc: "assets/icons/snowflake.png"};
  items: LeftNavBarItemLi[] = [
    { id: 1, label: 'My Day' , idLi: "myDayli",imgsrc: "assets/icons/snowflake.png"},
    { id: 2, label: 'Favorite', idLi: "myfavoriteli",imgsrc: "assets/icons/star_favorite_icon.png"},
    { id: 3, label: 'Planned', idLi: "myplanli",imgsrc: "assets/icons/calendar_icon.png" },
    { id: 4, label: 'Assigned to me', idLi: "forMeli",imgsrc: "assets/icons/for_me_icon.png" },
    { id: 5, label: 'Task', idLi: "taskli",imgsrc: "assets/icons/house_icon.png" },
  ];

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
    this.editingCategoryId = taskId;
  }

  saveTaskChanges(item: any): void {
    this.categoryApiService.updateCategory(item.category_id, item).subscribe(response => {
      console.log(response)
      this.GetCategory();
    }); 
    this.editingCategoryId = null;
  }
  
  editTask(item: any): void {
    this.showEditMode(item.category_id)
    console.log('Edit task:', item);
    this.hideContextMenu();
  }
  
  deleteCategory(item: any): void {
    this.categoryApiService.deleteCategory(item.category_id).subscribe(response => {
      console.log(response)
      this.GetCategory();
      this.apiService.getData().subscribe(
        data => {
          try {
            this.apiService.setTaskList(data);
          } catch (error) {
            console.error('Failed to parse JSON:', error);
          }
        },
        error => {
          console.error('HTTP error:', error);
          
        }
      );
    });
    this.leftNavBarService.selectedItem = this.SelectedItemLi; 
    console.log('Delete task:', item);
    this.hideContextMenu();
  }

  selectItem(item: LeftNavBarItemLi) {
    this.leftNavBarService.selectedItem = item;
    this.leftNavBarService.itemSelected.emit(item);
  }
  
  selectCategory(item: LeftNavBarCategory) {
    this.leftNavBarService.selectedCategory = item;
    this.leftNavBarService.CategorySelected.emit(item);
  }
}
