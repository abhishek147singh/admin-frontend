import { Routes } from '@angular/router';
import { LoginComponent } from './presentaion/screens/login/login.component';
import { MainScreenComponent } from './presentaion/screens/main-screen/main-screen.component';
import { LoginGaurd } from './gaurds/login.gaurd';
import { ManageProductComponent } from './presentaion/screens/manage-product/manage-product.component';
import { ManageBrandComponent } from './presentaion/screens/manage-brand/manage-brand.component';
import { ManageCategoryComponent } from './presentaion/screens/manage-category/manage-category.component';
import { ManageFeaturedProductsComponent } from './presentaion/screens/manage-featured-products/manage-featured-products.component';
import { ManageOrdersComponent } from './presentaion/screens/manage-orders/manage-orders.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {
        path:'dashboard', 
        component:MainScreenComponent, 
        canMatch:[LoginGaurd],
        children:[
            {path:'manage-product', component:ManageProductComponent},
            {path:'manage-brand', component:ManageBrandComponent},
            {path:'manage-category', component:ManageCategoryComponent},
            {path:'manage-featured-products', component:ManageFeaturedProductsComponent},
            {path:'manage-orders', component:ManageOrdersComponent},
        ]
    },
];
