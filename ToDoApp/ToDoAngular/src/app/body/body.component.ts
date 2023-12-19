import { Component, ElementRef, ViewChild,  Output, EventEmitter, OnInit  } from '@angular/core';
import { LeftNavBarComponent } from '../left-nav-bar/left-nav-bar.component';
import { LeftNavBarItemLi } from '../model/left-nav-bar-item.model';
import { LeftNavBarService } from '../service/left-nav-bar.service';
import { TodoApiService } from '../service/todo-api.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit{
  taskName: string = '';

  leftNavBarItems: LeftNavBarItemLi[] = [];
  
  selectedItem: LeftNavBarItemLi | null = null;
  
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
          const parsedData = JSON.parse(data);
          console.log(parsedData);
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
    // Викликати метод POST з використанням this.taskName
    this.apiService.postData(this.taskName).subscribe(response => {
      // Обробка відповіді (якщо потрібно)
      console.log(response);
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
