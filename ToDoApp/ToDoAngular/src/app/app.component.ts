import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
