import { Component, OnInit } from '@angular/core';
import { RoleService } from '../roleService';
import { UserRole } from '../user-role.enum';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  u: string = '';
  userRole: UserRole = UserRole.Admin; 
  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.userRole = this.roleService.getUserRole(); 
    this.u = this.roleService.getUserRoleName();
  }


}
