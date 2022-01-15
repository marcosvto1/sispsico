import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserSubject: BehaviorSubject<any>;
  currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
  ) {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.currentUserSubject = new BehaviorSubject<any>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(data: any): Observable<any> {
    return this.http.post(environment.url + '/login', data).pipe(
      map((dadosJson) => {
        sessionStorage.setItem('currentUser', JSON.stringify(dadosJson));
        this.currentUserSubject.next(dadosJson);
        return dadosJson;
      })
    );
  }

  user(): Observable<any> {
    return this.http.post(environment.url + '/user', {});
  }

  register(data: any): Observable<any> {
    return this.http.post(environment.url + 'register', data).pipe(
      map(dadosJson => {
        //console.log(dadosJson);
      })
    );
  }

  logout() {
    return this.http.post(environment.url + "/logout", {}).pipe(
      map(result => {
        localStorage.removeItem("currentUser");
        this.currentUserSubject.next(null);
      })
    );
  }

  refreshToken() {
    return this.http.post(`${environment.url}/refresh_token`, {}).pipe(
      map(data => {
        localStorage.setItem("currentUser", JSON.stringify(data));
        this.currentUserSubject.next(data);
      })
    );
  }

  cleanSession() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
