import { Component } from '@angular/core';
import { RoleService } from '../roleService';
import { UserRole } from '../user-role.enum';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  userRole: UserRole;
  // UserRole = UserRole;

  constructor(private roleService: RoleService) {
    this.userRole = this.roleService.getUserRole();
  }
}
