import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  users: {
    id: number;
    name: string;
    lastname: string;
    dateOfBirth: Date;
    salary: number;
    workingHours: number;
  }[] = [];

  constructor(private dataService: DataService) {
    this.users = dataService.getUsers();
  }
}
