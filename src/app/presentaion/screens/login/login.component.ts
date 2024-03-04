import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { login } from '../../../store/auth/auth.actions';
import { Subscription } from 'rxjs';
import { getAuth } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit, OnDestroy{
  error:string = '';
  loading:boolean = false;
  username:string = '';
  password:string = '';

  loginStateSubscription:Subscription|undefined;

  constructor(private store:Store<AppState>){}

  ngOnInit(): void {
    this.loginStateSubscription = this.store.select(getAuth).subscribe({
      next:(data => {
        this.error = data.error;
        this.loading = data.loading;
      })
    })
  }

  ngOnDestroy(): void {
    if(this.loginStateSubscription){
      this.loginStateSubscription.unsubscribe();
    }
  }

  onSubmit(){
    if(this.username !== ''){
      if(this.password !== ''){
        this.store.dispatch(login({username:this.username, pass:this.password, redirectionUrl: 'dashboard'}))
        
        this.error = '';
      }else{
        this.error = 'Password is required!!';
      }
    }else{
      this.error = 'Username is required!!';
    }
  }
  
}
