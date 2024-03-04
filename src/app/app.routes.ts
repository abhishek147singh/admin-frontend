import { Routes } from '@angular/router';
import { LoginComponent } from './presentaion/screens/login/login.component';
import { MainScreenComponent } from './presentaion/screens/main-screen/main-screen.component';
import { LoginGaurd } from './gaurds/login.gaurd';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {
        path:'dashboard', 
        component:MainScreenComponent, 
        // canMatch:[LoginGaurd],
        children:[
            
        ]
    },
];
