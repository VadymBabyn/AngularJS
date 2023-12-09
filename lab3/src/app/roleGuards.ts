import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from './roleService';import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements OnInit, CanActivate {
  constructor(private roleService: RoleService, private router: Router, private route: ActivatedRoute) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const requiredRoles = route.data['roles']; 

    if (requiredRoles && requiredRoles.length > 0) {
      const userRole = this.roleService.getUserRole();

      if (requiredRoles.includes(userRole)) {
        return true; 
      }
    }

    this.router.navigate(['./page-not-found']);
    return false;
  }
  

  ngOnInit() {
    this.router.events.subscribe(() => {
      const routeData = this.router.routerState.snapshot.root.firstChild?.data;
      
      if (routeData && routeData['roles']) {
        if (!this.roleService.hasAccessToRoute(routeData['roles'])) {
          this.router.navigate(['/home']);
        }
      }
    });
  }
}




