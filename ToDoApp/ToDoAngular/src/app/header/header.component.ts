import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserApiService } from '../service/user-api.service';
import { TodoApiService } from '../service/todo-api.service';
import { Task } from '../model/task.model';
import { BodyComponent } from '../body/body.component';
import { Observable, Subject } from 'rxjs';
import { TaskSearchService } from '../service/task-search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('authModalTemplate', { static: true }) authModalTemplate!: TemplateRef<any>;
  modalRef?: BsModalRef;

  title = 'ToDoApp';
  
  loginSuccess: boolean = false;
  registerSuccess: boolean = false;
  loginError: boolean = false;
  registerError: boolean = false;
  errorMessage: string = '';

  TakeSearch: string = '';

  private isTakeSearch = new Subject<string>();
  
  constructor(private modalService: BsModalService,
    private apiService: TodoApiService,
    private taskInteractionService: TaskSearchService,
    private userApiService: UserApiService
  ) {}
  
  getLoggedInStatusObservable(): Observable<string> {
    return this.isTakeSearch.asObservable();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  onSearchChange(TextSearch:string):void {
    this.taskInteractionService.setSearchQuery(TextSearch);
  }
  
  onSubmit(form: NgForm): void {
    const { username, password } = form.value;
    // Виклик сервісу для входу
    this.userApiService.login({ user_login: username, password: password }).subscribe(response => {
      this.userApiService.setUserId(response);
      if(response!==-1)
      {
        this.apiService.getData().subscribe(
          data => {
            try {
              this.apiService.setTaskList(data);
              this.userApiService.setLoggedInStatus(true);
              this.loginSuccess = true;
              this.loginError = false;
              this.errorMessage = 'Успішний вхід';
            } catch (error) {
              console.error('Failed to parse JSON:', error);
            }
          },
          error => {
            console.error('HTTP error:', error);
            
          }
        );
      }else
      {
        this.userApiService.setLoggedInStatus(false);
        this.loginError = true;
        this.loginSuccess = false;
        this.errorMessage = 'Логін або пароль не вірні';
      } 
      console.log(response);
    }, error => {
        console.error('Error:', error);       
    });
  }
  
  OnRegister(form: NgForm): void {
    const { username, password } = form.value;
    const value = password;
    const hasMinLength = value.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasDigit = /\d/.test(value);
    if(hasMinLength&&hasLetter&&hasDigit)
    {
      this.userApiService.register({ user_login:username, password: password }).subscribe(response => {
        // Обробка відповіді
        this.userApiService.setUserId(response);
        this.registerSuccess = true;
        this.registerError = false;
        this.errorMessage = 'Ви успішно зареєструвались та увійшли';
        if(response===-1)
        {
          this.registerError = true;
          this.registerSuccess = false;
          this.errorMessage = 'Користувач з таким логіном вже існує';
        }
      },(error)=>{
        console.error('Error:', error);
      });
    }else
    {
      this.registerError = true;
          this.registerSuccess = false;
          this.errorMessage = 'Пароль повинен мати мінімум 8 символів*, цифри* та букви*';
    }    
  }
  
  closeAuthModal() {
    this.modalService.hide();
  }
  
  performSearch():void {
    this.taskInteractionService.setSearchQuery('');
    this.TakeSearch = '';
  }

  profile_info()
  {
    console.log("opened info profile")
  }
}
