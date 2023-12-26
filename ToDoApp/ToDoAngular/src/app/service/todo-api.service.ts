import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';
import { Task } from '../model/task.model';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  private apiUrl = 'http://localhost:5202/api/Task';

  private taskList: Task[] = [];

  getTaskList(): Task[] {
    return this.taskList;
  }

  setTaskList(taskList: Task[]): void {
    this.taskList = taskList;
  }
  private searchContent: string = "";

  getsearchContent(): string {
    return this.searchContent;
  }

  setsearchContent(searchContent: string): void {
    this.searchContent = searchContent;
  }
  constructor(private http: HttpClient,  private userApiService: UserApiService) { }

  getData(): Observable<any> {
    const url = `${this.apiUrl}/${this.userApiService.getUserId()}`;
    return this.http.get(url);
  }
  postData(taskName: string, nowData:Data, categoryId: number): Observable<any>;
  postData(taskName: string, nowData:Data, categoryId: number, DataTimeToCompleteTask:Data): Observable<any>
  postData(taskName: string, nowData:Data, categoryId: number, DataTimeToCompleteTask?:Data): Observable<any> {
    if(DataTimeToCompleteTask!== undefined)
    {
      if(categoryId===1){
        var data = { TaskName: taskName, dataTimeCreateTask: nowData, root_table_username_id: this.userApiService.getUserId(), Favorite: false ,category_category_id: 5, dataTimeToCompleteTask: DataTimeToCompleteTask};
      }else if(categoryId===2){
        var data = { TaskName: taskName, dataTimeCreateTask: nowData, root_table_username_id: this.userApiService.getUserId(), Favorite: true ,category_category_id: 5, dataTimeToCompleteTask: DataTimeToCompleteTask};
      }else if(categoryId===3){
        var data = { TaskName: taskName, dataTimeCreateTask: nowData, root_table_username_id: this.userApiService.getUserId(), Favorite: false ,category_category_id: 5, dataTimeToCompleteTask: DataTimeToCompleteTask};
      }else if(categoryId===4){
        var data = { TaskName: taskName, dataTimeCreateTask: nowData, root_table_username_id: this.userApiService.getUserId(), Favorite: false ,category_category_id: 5, dataTimeToCompleteTask: DataTimeToCompleteTask};
      }else if(categoryId===5){
        var data = { TaskName: taskName, dataTimeCreateTask: nowData, root_table_username_id: this.userApiService.getUserId(), Favorite: false ,category_category_id: 5, dataTimeToCompleteTask: DataTimeToCompleteTask};
      }else
      {
        var data = { TaskName: taskName, dataTimeCreateTask: nowData, root_table_username_id: this.userApiService.getUserId(), Favorite: false ,category_category_id: categoryId, dataTimeToCompleteTask: DataTimeToCompleteTask};
      }
      return this.http.post(this.apiUrl, data);
    }else
    {
      if(categoryId===1){
        var dataNoTime = { TaskName: taskName, dataTimeCreateTask: nowData, root_table_username_id: this.userApiService.getUserId(), Favorite: false ,category_category_id: 5};
      }else if(categoryId===2){
        dataNoTime = { TaskName: taskName, dataTimeCreateTask: nowData, root_table_username_id: this.userApiService.getUserId(), Favorite: true ,category_category_id: 5};
      }else if(categoryId===3){
        dataNoTime = { TaskName: taskName, dataTimeCreateTask: nowData, root_table_username_id: this.userApiService.getUserId(), Favorite: false ,category_category_id: 5};
      }else if(categoryId===4){
        dataNoTime = { TaskName: taskName, dataTimeCreateTask: nowData, root_table_username_id: this.userApiService.getUserId(), Favorite: false ,category_category_id: 5};
      }else if(categoryId===5){
        dataNoTime = { TaskName: taskName, dataTimeCreateTask: nowData, root_table_username_id: this.userApiService.getUserId(), Favorite: false ,category_category_id: 5};
      }else
      {
        dataNoTime = { TaskName: taskName, dataTimeCreateTask: nowData, root_table_username_id: this.userApiService.getUserId(), Favorite: false ,category_category_id: categoryId};
      }
      return this.http.post(this.apiUrl, dataNoTime);
    }
    
  }

  deleteTask(taskId: number): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete(url);
  }
  updateTask(taskId: number, updateModel: any): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.put(url, updateModel);
  }
}
