import { ShoppingCartService } from './shopping-cart.service';
import { CategoryService } from './category.service';
import { UserService } from './user.service';
import {  AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
// import {MatTableModule} from '@angular/material/table';



import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, provideRoutes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule} from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AuthService } from './auth.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductService } from './product.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductsComponent } from './product/product.component';
import { ProductFilterComponent } from './product/procduct-filter/procduct-filter.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderService } from './order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { CategoryFormComponent } from './admin/category-form/category-form.component';
import { CategoryAddComponent } from './admin/category-add/category-add.component';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductCardComponent,
    ProductFilterComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    AdminCategoryComponent,
    OrderViewComponent,
    CategoryFormComponent,
    CategoryAddComponent

  


  ],
  imports: [
    
    // MatTableModule,
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'login', component: LoginComponent },

      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path: 'order-success/:id',component: OrderSuccessComponent, canActivate: [AuthGuard]},
      {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
      { path: 'order-view/:id', component: OrderViewComponent, canActivate: [AuthGuard] },

      
      
      
      {path: 'admin/admin-products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/admin-category', component: CategoryFormComponent, canActivate: [AuthGuard,AdminAuthGuard]},
      {path: 'admin/admin-category/new', component: AdminCategoryComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/admin-category/:id', component: CategoryFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/category-add', component: CategoryAddComponent, canActivate:[AuthGuard,AdminAuthGuard]},
      {path: 'admin/admin-products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/admin-products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/admin-orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      
      
    ]),
    NgbModule,
      
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  exports: [
    // MatTableModule
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
