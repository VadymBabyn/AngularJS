import { Component, OnInit } from '@angular/core';
import { UserRole } from '../user-role.enum';
import { RoleService } from '../roleService';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.component.html',
  styleUrls: ['./role-selection.component.css']
})
export class RoleSelectionComponent implements OnInit {
  selectedRole:UserRole = 1;

  constructor(private roleService:RoleService){}

  ngOnInit(): void {
    const storedRole = localStorage.getItem('selectedRole');
    if (storedRole) {
      this.selectedRole = +storedRole; 
    } else {
      this.selectedRole = UserRole.Admin;
    }
  }
  
  changeRole(newRole: UserRole) {
    this.selectedRole = newRole;

    localStorage.setItem('selectedRole', newRole.toString());

    location.reload();
  }
}
