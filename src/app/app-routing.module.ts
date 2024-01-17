import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { sellerAuthGuard } from './auth/seller-auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'seller-auth',component:SellerAuthComponent},
  {path:'seller-home',component:SellerHomeComponent,canActivate:[sellerAuthGuard]},
  {path:'seller-add-product',component:SellerAddProductComponent,canActivate:[sellerAuthGuard]},
  {path:'seller-update-product/:id',component:SellerUpdateProductComponent,canActivate:[sellerAuthGuard]},
  {path:'search/:query',component:SearchComponent},
  {path:'product/:productid',component:ProductdetailsComponent},
  {path:'user-auth',component:UserAuthComponent},
  {path:'cartsummary',component:CartpageComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'my-order',component:MyOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
