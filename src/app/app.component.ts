import { Component } from '@angular/core';
import { UserState } from './user-state';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'fp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fp-rx';

  username$: Observable<string>;
  loading$: Observable<boolean>;
  constructor(private userService: UserService ) {
    this.username$ = this.userService.username$;
    this.loading$ = this.userService.loading$;
  }

  login() {
    this.userService.logIn('alojzy');
  }
  logout() {
    this.userService.logOut();
  }
}
