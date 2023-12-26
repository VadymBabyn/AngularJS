import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';
import { User } from '../model/user.model';
import { Subject } from 'rxjs';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {
  private apiUrl = 'http://localhost:5202/api/Category';
  
  constructor(private http: HttpClient,  private userApiService: UserApiService) { }
  
  postCategory(categoryName: string): Observable<any> {
    const data = { category_name: categoryName,root_table_username_id: this.userApiService.getUserId()};
    return this.http.post(this.apiUrl, data);
  }

  getCategory(): Observable<any> {
    const url = `${this.apiUrl}/${this.userApiService.getUserId()}`;
    return this.http.get(url);
  }
 
  deleteCategory(categoryId: number): Observable<any> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.delete(url);
  }
 
  updateCategory(categoryId: number, updateModel: any): Observable<any> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.put(url, updateModel);
  }
}
