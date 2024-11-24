import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomerLayoutComponent } from './customer/customer-layout/customer-layout.component';
import { HomeComponent } from './customer/home/home.component';
import { AboutComponent } from './customer/about/about.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ManageCustomersComponent } from './admin/manage-customers/manage-customers.component';
import { ManageMealsComponent } from './admin/manage-meals/manage-meals.component';
import { AddMealsComponent } from './admin/manage-meals/add-meals/add-meals.component';
import { UpdateMealsComponent } from './admin/manage-meals/update-meals/update-meals.component';
import { RegisterComponent } from './customer/register/register.component';
import { UpdateProfileComponent } from './customer/update-profile/update-profile.component';
import { customerGuard } from './customer/guard/customer.guard';
import { ManagePricingComponent } from './admin/manage-pricing/manage-pricing.component';
import { AddPricingComponent } from './admin/add-pricing/add-pricing.component';
import { UpdatePricingComponent } from './admin/update-pricing/update-pricing.component';
import { ManageBookingsComponent } from './admin/manage-bookings/manage-bookings.component';
import { ManageCustomBookingsComponent } from './admin/manage-custom-bookings/manage-custom-bookings.component';
import { ViewMealsComponent } from './customer/view-meals/view-meals.component';
import { ViewPricingComponent } from './customer/view-pricing/view-pricing.component';
import { AddBookingsComponent } from './customer/add-bookings/add-bookings.component';
import { ViewMyBookingsComponent } from './customer/view-my-bookings/view-my-bookings.component';
import { CustomBookingsComponent } from './customer/custom-bookings/custom-bookings.component';
import { adminGuard } from './admin/guard/admin.guard';

export const routes: Routes = [
    {path:'', redirectTo:'/customer/home', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'customer', component:CustomerLayoutComponent, children:[
        {path:'home', component:HomeComponent},
        {path:'about', component: AboutComponent},
        {path: 'register', component:RegisterComponent},
        {path: 'update-profile',component:UpdateProfileComponent,canActivate:[customerGuard]},
        {path: 'view-meals', component:ViewMealsComponent},
        {path: 'view-pricing', component: ViewPricingComponent},
        {path: 'add-bookings/:id', component:AddBookingsComponent, canActivate:[customerGuard]},
        {path: 'view-my-bookings', component:ViewMyBookingsComponent},
        {path: 'custom-bookings', component:CustomBookingsComponent, canActivate:[customerGuard]}
    ]},

    {path:'admin', component:AdminLayoutComponent,canActivate:[adminGuard],children:[
        {path:'dashboard', component:DashboardComponent},
        {path:'manage-customers',component:ManageCustomersComponent},
        {path:'manage-meals', component:ManageMealsComponent},
        {path:'add-meals', component:AddMealsComponent},
        {path:'update-meals/:id', component:UpdateMealsComponent},
        {path:'manage-pricing', component:ManagePricingComponent},
        {path:'add-pricing', component:AddPricingComponent},
        {path:'update-pricing/:id', component:UpdatePricingComponent},
        {path:'manage-bookings', component:ManageBookingsComponent},
        {path:'manage-custom-bookings',component:ManageCustomBookingsComponent}
    ]},

    
    {path:'**',component:PageNotFoundComponent},
];
