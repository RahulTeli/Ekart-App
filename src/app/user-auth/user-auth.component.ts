import { Component } from '@angular/core';
import { LoginSeller, LoginUser, SignupUser } from 'src/data-type';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  userlogin:boolean=false;

  constructor(private serviceuser:UserService){}

  ngOnInit(){
    this.serviceuser.reloadUser();
  }


  userSingupFormSubmit(formdata:SignupUser):void{
  
   this.serviceuser.userSignup(formdata);
   
  }
  userLoginFormSubmit(formdata:LoginUser):void{

    this.serviceuser.userLogin(formdata);

  }

  openLogin(){

    this.userlogin = true;

  }

  openSignup(){
    this.userlogin = false;
  }

}
