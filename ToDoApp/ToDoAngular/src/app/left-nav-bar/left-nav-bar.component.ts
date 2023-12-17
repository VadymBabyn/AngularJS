import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LeftNavBarItemLi } from '../model/left-nav-bar-item.model';
import { LeftNavBarService } from '../service/left-nav-bar.service';

@Component({
  selector: 'app-left-nav-bar',
  templateUrl: './left-nav-bar.component.html',
  styleUrl: './left-nav-bar.component.css',
})
export class LeftNavBarComponent {
  isNavBarHidden = false; 
  selectedItem: LeftNavBarItemLi | null = null;
  
  constructor(private leftNavBarService: LeftNavBarService) {
    this.leftNavBarService.itemSelected.subscribe((item: LeftNavBarItemLi) => {
      this.selectedItem = item;
    });
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

 

  selectItem(item: LeftNavBarItemLi) {
    this.leftNavBarService.selectedItem = item;
    this.leftNavBarService.itemSelected.emit(item);
  }
  myDayli_click()
  {
  }
}
