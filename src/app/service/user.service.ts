import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser, SignupUser } from 'src/data-type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private client: HttpClient,
    private toast: ToastrService,
    private route: Router
  ) {}

  // ------------------ method for user signup --------------
  userSignup(data: SignupUser) {
    this.client
      .post<SignupUser>('http://localhost:3000/users', data, {
        observe: 'response',
      })
      .subscribe((response) => {
        this.toast.success('User Registered', 'Success', {
          progressBar: true,
          closeButton: true,
        });

        localStorage.setItem('user', JSON.stringify(response.body));
        this.route.navigate(['']);
      });
  }

  // ------------- method for user login-----------------

  userLogin(data: LoginUser) {
    this.client.get(
      `http://localhost:3000/users?Email=${data.Email}&Password=${data.Password}`,
      { observe: 'response' }
    ).subscribe((result:any)=>{

      if(result && result.body && result.body.length){

        this.toast.success('Login Succesfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });

        localStorage.setItem('user',JSON.stringify(result.body));

        this.route.navigate(['']);
      }
      else{
        this.toast.error('Invalid Credentials', 'Warning', {
          progressBar: true,
          closeButton: true,
        });
      }

    })




  }

  // method for user reload so it can't access signup page after login
  reloadUser() {
    if (localStorage.getItem('user')) {
      this.route.navigate(['']); //navigating to  home page
    }
  }
}
