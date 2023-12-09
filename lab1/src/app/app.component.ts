import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "lab1";
  menuItems:{ label: string; active: boolean }[] = [
    
    {
      label: 'Фільми',
      active: false
    },
    {
      label: 'Інформація',
      active: false
    }
  ];
  setActive(item:{label:string; active: boolean}): void{
    this.menuItems.forEach((menuItem) => {
  menuItem.active = menuItem.label === item.label;
});

  }

}
