import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToasterService } from '../../../services/toaster.service';
import { Subscription } from 'rxjs';
import { ToasterModel } from '../../../core/domain/others/toaster.mode';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
})

export class ToasterComponent implements OnInit , OnDestroy{
  toasts: ToasterModel[] = []
  toasterArraySubscription:Subscription | undefined;

  constructor(private tosterService:ToasterService){}

  ngOnInit(): void {
    this.toasterArraySubscription = this.tosterService.getToasts().subscribe(toasterArray => {
      this.toasts = toasterArray;
      // console.log(this.toasts)
    });
  }

  ngOnDestroy(): void {
    if(this.toasterArraySubscription){
      this.toasterArraySubscription.unsubscribe();
    }
  }

  remove(toastId:string){
    this.tosterService.remove(toastId);
  }
}