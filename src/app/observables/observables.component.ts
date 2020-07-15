import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, Subscription, of, fromEvent } from 'rxjs';

import { tap, map, filter, take, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'fp-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent implements OnInit, AfterViewInit {

  @ViewChild('btn') btn: ElementRef;
  @ViewChild('myInput') input: ElementRef;
  filteredInputData$: Observable<any>;

  subscription: Subscription;
  obs$ = new Observable(obs => {
    console.log('start emitting')
    obs.next(1);
    obs.next(2);
    obs.complete();
  });

  obs2$ = of(1,2,3);

  constructor() { }

  ngOnInit(): void {
    this.obs2$
    .pipe(
      filter(v => v > 2)
    )
    .subscribe(val => console.log(val), err => console.log(err), () => console.log('completed'))
  }

  ngAfterViewInit() {

    this.filteredInputData$ = fromEvent(this.input.nativeElement, 'input').pipe(
      map((v: any) => v.target.value),
      filter(v => !v.includes('dupa')),
      debounceTime(400)
    )

    let evObs$ = fromEvent(this.btn.nativeElement, 'click')
    .pipe(
      take(5),
      tap(v => console.log('tap: ' + v)),
      map((e: any) => e.target),
      tap(v => console.log('tap: ' + v)),
    )
    .subscribe(v => console.log(v), err => console.error('error', err), ()=> console.log('completed'));
  }

}
