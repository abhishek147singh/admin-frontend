import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ToasterModel } from '../../../core/domain/others/toaster.mode';
import { NgClass, NgStyle } from '@angular/common';
import { ToasterType } from '../../../core/enumes/ToasterType.enum';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations:[
    trigger('toaster',[
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(150, style({ transform: 'translateX(0)' }))
      ]),
      transition('* => void', [
        animate(150, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})

export class ToastComponent implements OnInit, OnDestroy {
  
  toasterTypes = ToasterType;

  totalLifeSpan:number = 300;

  lifeSpan:number = 300;

  isHover:boolean = false;

  progress:number = 100;

  intervalSubscription:Subscription | undefined;

  @Input() toast:ToasterModel|undefined;

  @Output() removeToasterEmt = new EventEmitter<string> ();

  ngOnInit(): void {
    this.intervalSubscription = interval(10).subscribe(time => {
      if(!this.isHover){

        this.lifeSpan--;
        this.progress = this.getPercentage(this.totalLifeSpan, this.lifeSpan);
        
        if(this.lifeSpan <= 0 && this.toast){
          this.remove(this.toast.id);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if(this.intervalSubscription){
      this.intervalSubscription.unsubscribe();
    }
  }

  remove(toastId:string){
    this.removeToasterEmt.emit(toastId);
  }

  getPercentage(total:number, current:number){
    return Math.floor((current / total) * 100);
  }
}
