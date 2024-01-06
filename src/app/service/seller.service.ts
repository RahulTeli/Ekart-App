import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupSeller } from 'src/data-type';
import { ToastrService } from 'ngx-toastr';  // for notification
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private client: HttpClient,private toast:ToastrService,private route:Router) {}

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  sellerSignUp(data: SignupSeller) {
    console.log('service called');
    return this.client.post('http://localhost:3000/seller', data, {
      observe: 'response',
    }).subscribe((resp)=>{
      console.log(resp);
      this.toast.success("Seller Added","Success",{progressBar:true,closeButton:true});

      this.isSellerLoggedIn.next(true);
      this.route.navigate(['seller-home']);
    
     },
     (error:SignupSeller)=>{
      console.log(error);
      this.toast.error("Something went wrong","Error");
     });
     return false;
  }
}
