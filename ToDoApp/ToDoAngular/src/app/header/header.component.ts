import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'ToDoAngular';
  performSearch()
  {
    console.log("Searching")
  }
  profile_info()
  {
    console.log("opened info profile")
  }
}
