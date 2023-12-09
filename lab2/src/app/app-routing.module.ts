import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [/*
  { path: 'contact', component: ContactComponent },
  { path: 'user/:id', component: UserComponent },
  { path: '', redirectTo: '/contact', pathMatch: 'full' } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
