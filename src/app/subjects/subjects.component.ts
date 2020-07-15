import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';

@Component({
  selector: 'fp-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {


  // wykorzystanie np jako Event Bus
  private testSubj = new Subject();
  test$ = this.testSubj.asObservable();

  // zarządzanie stanem danych
  private bSubj = new BehaviorSubject('b1');
  bObs$ = this.bSubj.asObservable();
  get bLastValue() {
    return this.bSubj.value;
  }

  private rSubj = new ReplaySubject(3);

  private aSubj = new AsyncSubject();
  constructor() { }

  ngOnInit(): void {

    // this.bObs$.subscribe(v => console.log(v))

    // this.setNewBVal('b2');
    // console.log(this.bLastValue);

    // this.testSubj.next(1);
    // this.test$.subscribe(v => console.log(v));


    //this.testSubj.error('f...ck!')
    // this.testSubj.next(2);

    // this.rSubj.next('r1');
    // this.rSubj.next('r2');
    // this.rSubj.next('r3');
    // this.rSubj.next('r4');

    // this.rSubj.subscribe(v => console.log(v));

    // this.aSubj.subscribe(v => console.log(v));
    // this.aSubj.next('a1')
    // this.aSubj.next('a2')
    // this.aSubj.next('a3')
    // this.aSubj.complete();

  }

  setNewBVal(v) {
    this.bSubj.next(v);
  }

}
