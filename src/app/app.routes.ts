import { Routes } from '@angular/router';
import { LoginComponent } from './presentaion/screens/login/login.component';
import { MainScreenComponent } from './presentaion/screens/main-screen/main-screen.component';
import { LoginGaurd } from './gaurds/login.gaurd';
import { ManageProductComponent } from './presentaion/screens/manage-product/manage-product.component';
import { ManageBrandComponent } from './presentaion/screens/manage-brand/manage-brand.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {
        path:'dashboard', 
        component:MainScreenComponent, 
        // canMatch:[LoginGaurd],
        children:[
            {path:'manage-product', component:ManageProductComponent},
            {path:'manage-brand', component:ManageBrandComponent},
        ]
    },
];
