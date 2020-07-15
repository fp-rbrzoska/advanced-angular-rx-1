import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, Subscription, of, fromEvent } from 'rxjs';

@Component({
  selector: 'fp-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent implements OnInit, AfterViewInit {

@ViewChild('btn') btn: ElementRef;

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
    this.obs2$.subscribe(val => console.log(val), err => console.log(err), () => console.log('completed'))
  }

  ngAfterViewInit() {
    let evObs$ = fromEvent(this.btn.nativeElement, 'click');
    setTimeout(() => evObs$ .subscribe(v => console.log(v)), 5000)



  }

}
