import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  users = [
    {
      id: 1,
      name: 'Victor',
      lastname: 'Velichko',
      dateOfBirth: new Date("2/1/1990"),
      salary: 50000,
      workingHours: 123456789
    },
    {
      id: 2,
      name: 'Kate',
      lastname: 'Doe',
      dateOfBirth: new Date("6/6/1980"),
      salary: 88000,
      workingHours: 12345
    },
    {
      id: 3,
      name: 'John',
      lastname: 'Smith',
      dateOfBirth: new Date("4/15/1975"),
      salary: 75000,
      workingHours: 1600
    },

    {
      id: 4,
      name: 'Alice',
      lastname: 'Johnson',
      dateOfBirth: new Date("9/23/1988"),
      salary: 62000,
      workingHours: 2000
    },

    {
      id: 5,
      name: 'Michael',
      lastname: 'Williams',
      dateOfBirth: new Date("11/10/1992"),
      salary: 55000,
      workingHours: 1750
    },

    {
      id: 6,
      name: 'Emma',
      lastname: 'Brown',
      dateOfBirth: new Date("3/5/1985"),
      salary: 70000,
      workingHours: 1800
    },

    {
      id: 7,
      name: 'David',
      lastname: 'Wilson',
      dateOfBirth: new Date("7/20/1983"),
      salary: 80000,
      workingHours: 1500
    },

    {
      id: 8,
      name: 'Olivia',
      lastname: 'Miller',
      dateOfBirth: new Date("1/12/1991"),
      salary: 67000,
      workingHours: 1900
    },

    {
      id: 9,
      name: 'William',
      lastname: 'Jones',
      dateOfBirth: new Date("8/7/1978"),
      salary: 72000,
      workingHours: 1700
    },

    {
      id: 10,
      name: 'Sophia',
      lastname: 'Anderson',
      dateOfBirth: new Date("5/29/1987"),
      salary: 69000,
      workingHours: 1950
    },
  ];

  selectedUser: any;

  constructor(private dataService: DataService) {
    this.users = this.dataService.getUsers();
  }
  onSelectUser(user: any) {
    this.selectedUser = user;
  }
}
