import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'fp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  isAdmin$: Observable<boolean>;
  constructor(private userService: UserService ) {
    this.isAdmin$ = this.userService.isAdmin$;
  }

  ngOnInit(): void {
  }

}
