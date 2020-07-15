import { Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserState } from './user-state';
import { map, tap, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userStore = new BehaviorSubject<UserState>({
    isAdmin: null,
    username: null,
    loading: false
  });
  private history: { action: string, state: UserState }[] = [{ action: 'APP_INIT', state: this.userStore.value }]

  userState$ = this.userStore.asObservable();
  username$ = this.userStore.pipe(
    map( s => s.username),
    distinctUntilChanged()
  );

  isAdmin$ = this.userStore.pipe(
    map( s => s.isAdmin),
    distinctUntilChanged()
  );

  loading$ = this.userStore.pipe(
    map( s => s.loading),
    distinctUntilChanged()
  );

  constructor(private httpClient: HttpClient) {
   }

  logIn(username: string) {
    this.setState({ loading: true }, 'LOGIN')
    this.httpClient.get<any>('http://localhost:3000/users', { params: { username }}).pipe(map(u => u[0])).subscribe(
     u=> this.setState({ username: u.username, isAdmin: u.isAdmin, loading: false }, 'LOGIN_SUCCESS')
    )
  }

  logOut() {
    this.setState({ username: null, isAdmin: null}, 'LOGOUT');
  }

  private setState(state: Partial<UserState>, action: string) {
    const currentState = this.userStore.value;
    const newState = { ...currentState, ...state }
    this.userStore.next(newState);
    this.history.push({ action, state: newState })
    console.log(this.history)
  }
}
