import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OrdermanagemetComponent } from './ordermanagemet/ordermanagemet.component';
import { AuthGuard } from './auth.guard';
import { SingleProductComponent } from './single-product/single-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'orderform', component: OrderFormComponent, canActivate: [AuthGuard] },
  { path: 'ordermanagement', component: OrdermanagemetComponent, canActivate: [AuthGuard], data: { isAdmin: true } },
  { path: 'aboutus', component: AboutusComponent, canActivate: [AuthGuard]},
  { path: 'faq', component: FaqComponent, canActivate: [AuthGuard]},
  { path: 'product/:id', component: SingleProductComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
