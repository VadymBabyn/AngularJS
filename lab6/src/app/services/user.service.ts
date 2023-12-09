import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface User {
  id: string;
  name: string;
  lastname: string;
  type: string;
  email: string;
  password: string;
  confirmPassword: string;
  subjects: string[];
  description: string;
  sex: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];

  createUser(user: User): Observable<User> {
    this.users.push(user);
    return of(user);
  }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getUserById(id: string): Observable<User | undefined> {
    const user = this.users.find((u) => u.id === id);
    return of(user);
  }

  updateUser(user: User): Observable<User> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
    return of(user);
  }

  deleteUser(id: string): Observable<void> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    return of(undefined);
  }
}
