import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usernameSubject = new BehaviorSubject<string>('');

  login(name: string, password: string) {
    // TODO: implement login logic
    this.usernameSubject.next(name);
  }

  get username$() {
    return this.usernameSubject.asObservable();
  }
}
