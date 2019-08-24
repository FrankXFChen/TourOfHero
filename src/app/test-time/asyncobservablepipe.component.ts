import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'async-observable-pipe',
    template: `<div>Time: {{ time | async }}</div>`
  })
  export class AsyncObservablePipeComponent {
    time = new Observable(observer =>{
      setInterval(() => {observer.next(new Date().toString());}, 1000)
    });
  }