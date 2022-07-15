import { Component, Pipe, PipeTransform } from '@angular/core';
import { interval, map, mapTo, Subscription, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
title = 'timer';

source = timer(0, 1000);
initialValue = 3
counter = this.initialValue // value on seconds
subscription!: Subscription;

startTimer(){
  this.subscription = this.source.subscribe({
    next: ()=>{
      if(this.counter !=0)
      --this.counter
      else{
        this.subscription.unsubscribe();
      }
    }
  });
}

pauseTimer(){
  this.subscription.unsubscribe()
}

resetTimer(){
    this.subscription.unsubscribe();
    this.counter = this.initialValue
  }
}

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}
