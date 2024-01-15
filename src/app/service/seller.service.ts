import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginSeller, SignupSeller } from 'src/data-type';
import { ToastrService } from 'ngx-toastr'; // for notification
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(
    private client: HttpClient,
    private toast: ToastrService,
    private route: Router
  ) {}

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  // method for seller signup
  sellerSignUp(data: SignupSeller) {
    console.log('service called');
    this.client
      .post('http://localhost:3000/seller', data, {
        observe: 'response'
      })
      .subscribe(
        (resp) => {
          this.toast.success('Seller Registered', 'Success', {
            progressBar: true,
            closeButton: true,
          });
          this.isSellerLoggedIn.next(true); //setting auth guard value to true
          localStorage.setItem('seller', JSON.stringify(resp.body));

          this.route.navigate(['seller-home']); //navigating to seller home page
        },
        (error: SignupSeller) => {
          this.toast.error('Something went wrong', 'Error');
        }
      );
  }

  // method for seller reload
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true); //setting auth guard value to true so it can go to that page
      this.route.navigate(['seller-home']); //navigating to seller home page
    }
  }

  // ----------------- seller Login -----------

  // method for seller login
  sellerLogin(data: LoginSeller) {
    this.client
      .get(
        `http://localhost:3000/seller?Email=${data.Email}&Password=${data.Password}`
      ,{observe:'response'} ) // observe:'response' used to get response in json
      .subscribe((response:any) => {
        if(response && response.body && response.body.length)
        {
          localStorage.setItem('seller', JSON.stringify(response.body));
          this.toast.success( 'Login Succesfull', 'Welcome', {
            progressBar: true,
            closeButton: true,
          });
          this.route.navigate(['seller-home']); //navigating to seller home page
        }
        else{
          this.toast.error('Incorrect Credentials', 'Message',{progressBar:true,closeButton:true});
        }
      });
  }


  

}
