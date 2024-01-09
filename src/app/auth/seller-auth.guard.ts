import { CanActivateFn } from '@angular/router';
import { SellerService } from '../service/seller.service';
import { inject } from '@angular/core';

export const sellerAuthGuard: CanActivateFn = (route, state) => {
  let service = inject(SellerService)   // is used to inject dependecy if there is no constructor
  
  if(localStorage.getItem('seller')){
   return true;
  }

  return service.isSellerLoggedIn;
};
