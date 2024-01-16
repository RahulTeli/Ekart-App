import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order, Summary } from 'src/data-type';
import { ProductsService } from '../service/products.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  constructor(private serviceproduct:ProductsService,private toast:ToastrService,private route:Router){}

  name:string=''
  email:string=''
 total:number=0;

  
  ngOnInit(){
    let user = localStorage.getItem('user');      
    let userdata = user && JSON.parse(user)[0];
    this.name = userdata.Name;
    this.email = userdata.Email;


    this.serviceproduct.GetCartSummary().subscribe((response)=>{
      if(response && response.length!==0){
        let price = 0;
        response.forEach((item)=>{
            price = price + (+item.productprice * + item.quantity);  // converting to number 
           
        });

        this.total = price + 100 + (price/100) -(price/1000) ;
      
        
      } 

  
    })

 
  }


  checkoutsubmit(data:Order){
      
      let user = localStorage.getItem('user');      
      let userdata = user && JSON.parse(user)[0];
      let userid = userdata.id;

      let order :Order= {
        ...data,
        amount:this.total,
        userid
      }
    
      this.serviceproduct.OrderNow(order).subscribe((response)=>{
        if(response){
         
            this.toast.success('Order Placed','Yahhoooo!!',{progressBar:true,closeButton:true})
            this.route.navigate(['']);
          
        }
      })
    
  }
}
