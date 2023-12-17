import { Component, ElementRef, ViewChild,  Output, EventEmitter, OnInit  } from '@angular/core';
import { LeftNavBarComponent } from '../left-nav-bar/left-nav-bar.component';
import { LeftNavBarItemLi } from '../model/left-nav-bar-item.model';
import { LeftNavBarService } from '../service/left-nav-bar.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit{
  leftNavBarItems: LeftNavBarItemLi[] = [];
  selectedItem: LeftNavBarItemLi | null = null;
  constructor(private leftNavBarService: LeftNavBarService) {}

  ngOnInit() {
    this.leftNavBarService.itemSelected.subscribe((item: LeftNavBarItemLi) => {
      this.selectedItem = item;
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
