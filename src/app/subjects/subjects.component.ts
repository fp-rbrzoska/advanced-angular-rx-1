import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject, of, Observable, forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'fp-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  formData$: Observable<any>;
  showError = false;
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
    this.loadData();
    this.bSubj.pipe(
      catchError(e => of(e))
    )

    this.bObs$.subscribe(v => console.log(v))

    this.setNewBVal('b2');

    // setTimeout(() => {
    //   this.bSubj.error('cos je..ło');

    //   setTimeout(() => {
    //     this.setNewBVal('znowu ok');
    //   }, 2000)
    // }, 5000)


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

  loadData() {
    this.formData$ = forkJoin([this.fetchData1(), this.fetchData2()]).pipe(catchError(() => {
      this.showError = true;
      return throwError('error')
     }
      ))
  }

  fetchData1() {
    return new Observable(obs => {
      setTimeout(() => {
        obs.next('a');
        obs.complete();
      }, 1500)
    })
  }

  fetchData2() {
    return new Observable(obs => {
      setTimeout(() => {
        obs.error('b');
        obs.complete();
      }, 3500)
    })
  }

  setNewBVal(v) {
    this.bSubj.next(v);
  }



}
