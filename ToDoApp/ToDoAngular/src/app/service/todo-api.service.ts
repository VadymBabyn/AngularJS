import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  private apiUrl = 'http://localhost:5202/api/Task';

  TaskCreate: Task = {
    task_id:0,

    root_table_username_id:0,
        
    taskName: '',

    completed:false,

    favorite: false,

    dataTimeCreateTask: new Date(),

    dataTimeEndTask: new Date('0001-01-01T00:00:00'),

    dataTimeToCompleteTask: new Date('0001-01-01T00:00:00'),
    category_category_id: 5
  }
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  postData(taskName: string, nowData:Data): Observable<any> {
    this.TaskCreate.taskName = taskName;
    const data = { TaskName: this.TaskCreate.taskName, dataTimeToCompleteTask: nowData};
    return this.http.post(this.apiUrl, data);
  }
  updateTask(taskId: number, updateModel: any): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.put(url, updateModel);
  }
}
