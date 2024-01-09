import { Component } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { SignupSeller } from 'src/data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  constructor(private service:SellerService){  //creating object 
  }

  sellerlogin:boolean=false;
  ngOnInit(){
    this.service.reloadSeller();
  }
  
  sellerSingupFormSubmit(formdata:SignupSeller):void{
  
   this.service.sellerSignUp(formdata);
   
  }
  sellerLoginFormSubmit(formdata:SignupSeller):void{

   this.service.sellerLogin(formdata);
  }

  openLogin(){

    this.sellerlogin = true;

  }

  openSignup(){
    this.sellerlogin = false;
  }

}
