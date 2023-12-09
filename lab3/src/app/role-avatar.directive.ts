import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { UserRole } from './user-role.enum';

@Directive({
  selector: '[appRoleAvatar]',
})
export class RoleAvatarDirective implements OnInit {
  @Input() appRoleAvatar: UserRole = UserRole.Admin;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const firstLetter = this.getRoleFirstLetter(this.appRoleAvatar);

    this.el.nativeElement.textContent = firstLetter; 

    const backgroundColor = this.getRoleBackgroundColor(this.appRoleAvatar);
    this.renderer.setStyle(this.el.nativeElement, 'background-color', backgroundColor);
  }

  getRoleFirstLetter(role: UserRole): string {
    const roleName = UserRole[role].toString(); 
    return roleName[0]; 
  }

  getRoleBackgroundColor(role: UserRole): string {
    switch (role) {
      case UserRole.Admin:
        return 'red';
      case UserRole.Moderator:
        return 'green';
      case UserRole.User:
        return 'blue';
      default:
        return 'gray'; 
    }
  }
}
