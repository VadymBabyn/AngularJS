import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeftNavBarComponent } from './left-nav-bar/left-nav-bar.component';
import { BodyComponent } from './body/body.component';
import { LeftNavBarService } from './service/left-nav-bar.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterTasksPipe } from './pipe/filter-tasks.pipe';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftNavBarComponent,
    BodyComponent,
    FilterTasksPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [LeftNavBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
