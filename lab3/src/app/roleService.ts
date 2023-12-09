import { Injectable } from '@angular/core';
import { UserRole } from './user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  getUserRoleName(): string {
    switch (this.currentUserRole) {
      case UserRole.Admin:
        return 'Admin';
      case UserRole.Moderator:
        return 'Moderator';
      case UserRole.User:
        return 'User ';
      default:
        return 'No Role';
    }
  }
  private currentUserRole: UserRole = 1;
  hasAccessToRoute(routesRoles: UserRole[]):boolean{
    return routesRoles.includes(this.currentUserRole);
  }
  getUserRole(): UserRole {
    return this.currentUserRole;
  }
  setUserRole(role: UserRole) {
    this.currentUserRole = role;
  }
  
}
