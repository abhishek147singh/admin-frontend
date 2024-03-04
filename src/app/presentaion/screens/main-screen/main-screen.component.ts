import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToasterComponent } from '../../components/toaster/toaster.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { getAuth } from '../../../store/auth/auth.selectors';
import { Subscription } from 'rxjs';
import { NavigationEnd, PRIMARY_OUTLET, UrlTree } from '@angular/router';
import {filter, tap} from 'rxjs/operators';
import { logout } from '../../../store/auth/auth.actions';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [RouterOutlet, ToasterComponent, NgStyle, RouterLink, NgClass],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.scss',
  animations:[
    trigger('dropdown', [
      state('collapsed', style({ height: '0' , padding: '0'})),
      state('expanded', style({ height: '*', padding: '*'})),
      transition('collapsed <=> expanded',
        animate('300ms ease-in-out'),
      ),
    ]),
    trigger('slide', [
      state('collapsed', style({ left: '-100px'})),
      state('expanded',  style({ left: '250px'})),
      transition('collapsed <=> expanded',
        animate('300ms ease-in-out'),
      ),
    ]),
    trigger('showhide', [
      state('show', style({ opacity: '1'})),
      state('hide',  style({ opacity: '0'})),
      transition('show <=> hide',
        animate('300ms ease-in-out'),
      ),
    ]),
  ]
})

export class MainScreenComponent implements OnInit , OnDestroy {
  
  userName:string = 'Username';
  
  loadding:boolean = false;

  isSideBarOpened:boolean = true;

  authDataSubscription:Subscription|undefined;

  routerSubscription:Subscription|undefined;

  activeUrl:string = '';

  constructor(private store:Store<AppState>, private router:Router){}

  ngOnInit(): void {
    this.authDataSubscription = this.store.select(getAuth).subscribe({
      next:(authData => {
        if(authData.userName){
          this.userName = authData.userName;
          this.loadding = false;
        }else{
          // this.router.navigate(['login']);
        } 
      }),
      error:(error => {
        this.loadding = false;
      })
    });

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.initializeActiveUrl(this.router.url);
    });

    this.initializeActiveUrl(this.router.url);
  }

  ngOnDestroy(): void {
    if(this.authDataSubscription){
      this.authDataSubscription.unsubscribe();
    }

    if(this.routerSubscription){
      this.routerSubscription.unsubscribe()
    }
  }

  logout(){
    this.store.dispatch(logout());
  }

  initializeActiveUrl(Url:string){
    const tree: UrlTree = this.router.parseUrl(Url);
    const primary_outlet = tree.root.children[PRIMARY_OUTLET];

    if(primary_outlet){
      const segments = primary_outlet.segments;
      const lastSegment = segments.at(-1);

      if(lastSegment !== undefined){
        this.activeUrl = lastSegment.path;
      }
    }
      
  }

}
