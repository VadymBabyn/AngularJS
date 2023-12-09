import { APP_INITIALIZER,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // Додайте імпорт RouterModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { CustomNumberPipe } from './custom-number.pipe';
import { UserComponent } from './user/user.component';
import { MoreComponent } from './more/more.component';
import { RoleGuard } from './roleGuards';
import { UserRole} from './user-role.enum';
import { RoleSelectionComponent } from './role-selection/role-selection.component';
import { RoleService } from './roleService';
import { RoleAvatarDirective } from './role-avatar.directive';
import { WelcomeMessageDirective } from './welcome-message.directive';

const routes: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [RoleGuard], data:{roles:[UserRole.Admin, UserRole.Moderator, UserRole.User]}}/* , canActivate: [RoleGuard], 
  data:{ requiredRole: [UserRole.Admin, UserRole.Moderator]  } */ ,
  { path: 'contact', component: ContactComponent, canActivate: [RoleGuard], data:{roles:[UserRole.Admin]}/* , canActivate: [RoleGuard], 
  data:{ requiredRole: [UserRole.Admin, UserRole.Moderator, UserRole.User]  } */},
  { path: 'more', component: MoreComponent, canActivate: [RoleGuard], data:{roles:[UserRole.Admin,UserRole.Moderator, UserRole.User]}/* , canActivate: [RoleGuard], 
  data:{ requiredRole: [UserRole.Admin]} */},
  { path: 'user/:id', component: PersonDetailsComponent,canActivate:[RoleGuard], data: {requiredRole: UserRole.Admin}},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    PageNotFoundComponent,
    PersonDetailsComponent,
    CustomNumberPipe,
    UserComponent,
    MoreComponent,
    RoleSelectionComponent,
    RoleAvatarDirective,
    WelcomeMessageDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes) 
  ],
  //providers: [RoleGuard],
  providers:[
    {
      provide: APP_INITIALIZER,
      useFactory: (roleService: RoleService)=>()=>{
        const storedRole = localStorage.getItem('selectedRole');
        if (storedRole) {
          roleService.setUserRole(+storedRole);
        }
      },
      deps:[RoleService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
