import { Component, OnInit } from '@angular/core';
import { RoleService } from '../roleService';
import { UserRole } from '../user-role.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentRole: UserRole = 1;
  UserRole=UserRole;

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.currentRole = this.roleService.getUserRole();
  }

  changeRole(newRole: UserRole) {
    this.roleService.setUserRole(newRole);
    this.currentRole = newRole;
    localStorage.setItem('selectedRole', newRole.toString());
    location.reload();
  }
}
