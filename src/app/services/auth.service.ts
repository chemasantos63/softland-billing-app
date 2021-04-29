import { StorageService } from './storage.service';
import { SinginDto, User, UserToken } from '../core/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from '../shared/endpoints';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: Observable<User>;

  private currentUserSubject: BehaviorSubject<User>;
  private currentUserTokentSubject: BehaviorSubject<string>;

  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUserTokentSubject = new BehaviorSubject<string>(
      this.currentUserValue ? this.currentUserValue.token : ``
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentTokenValue(): string {
    return this.currentUserTokentSubject.value;
  }

  public async singin(singinDto: SinginDto): Promise<User> {
    return this.http
      .post<User>(`${environment.apiBaseUri}/${ApiPath.login}`, singinDto)
      .pipe(
        map((response: UserToken) => {
          const token = response.token;
          const user = jwtDecode(token) as User;
          user.token = token;
          localStorage.setItem(`currentUser`, JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.currentUserTokentSubject.next(token);
          return user;
        })
      )
      .toPromise();
  }

  public logout(): void {
    localStorage.removeItem('currentUser');

    this.currentUserSubject.next(null);

    this.currentUserTokentSubject.next(null);
  }
}
