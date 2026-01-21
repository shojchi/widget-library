import { Injectable } from '@angular/core';
import { User } from '../store/auth/auth.state';
import { delay, Observable, of, throwError } from 'rxjs';

const MOCK_USERS: Array<User & { password: string }> = [
  { id: '1', username: 'admin', password: 'admin', email: 'admin@example.com' },
  { id: '2', username: 'user', password: 'user', email: 'user@example.com' },
  { id: '3', username: 'demo', password: 'demo' }
];

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(username: string, password: string): Observable<User> {
    const user = MOCK_USERS.find(u => u.username === username && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return of(userWithoutPassword).pipe(delay(1000));
    } else {
      return throwError(() => new Error('Invalid username or password')).pipe(delay(500));
    }
  }
}
