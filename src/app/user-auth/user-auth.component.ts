import { Component } from '@angular/core';
import { Cart, LoginSeller, LoginUser, Product, SignupUser } from 'src/data-type';
import { UserService } from '../service/user.service';
import { ProductsService } from '../service/products.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  userlogin:boolean=false;

  constructor(private serviceuser:UserService,private toast:ToastrService,private serviceproduct:ProductsService,private route:Router){}

  ngOnInit(){
    this.serviceuser.reloadUser();
  }


  userSingupFormSubmit(formdata:SignupUser):void{
  
   this.serviceuser.userSignup(formdata);
   
  }
  userLoginFormSubmit(formdata:LoginUser):void{
 
    this.serviceuser.userLogin(formdata).subscribe((result:any)=>{

        
      if(result  && result.length){
        
        this.toast.success('Login Succesfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });

        localStorage.setItem('user',JSON.stringify(result));

        this.LocalCartToDBCart();
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

  openLogin(){

    this.userlogin = true;

  }

  openSignup(){
    this.userlogin = false;
  }

  LocalCartToDBCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userid = user && JSON.parse(user)[0].id;
    
    if(data){
     
      let cartDataList:Product[] = JSON.parse(data);
    

      cartDataList.forEach((product,index)=>{
        let CartData:Cart= {        //creating cart type object and setting there values one by one from local storage
          ...product,
          productid : product.id,
          userid
        }
        delete CartData.id
       
        setTimeout(() => {
          this.serviceproduct.AddtoCartAfterLogin(CartData).subscribe((response)=>{
            if(response){
              console.warn(response);
            }
            
            
          })
          if(cartDataList.length = index+1){
            localStorage.removeItem('localCart');
          }
        }, 700);
      })


    }
    setTimeout(() => {
      this.serviceproduct.GetCartListAfterLogin(userid);
    }, 1000);
  }

}
