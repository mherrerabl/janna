import { Injectable } from '@angular/core';
import { UserDTO } from '../../users/models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getUser(): UserDTO {
    let user: UserDTO = {
      email: '',
      token: '',
    };
    if (typeof window !== 'undefined') {
      user = JSON.parse(localStorage.getItem('user') as any);
    }
    return user;
  }

  saveUser(user: UserDTO): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  removeUser(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  }
}
