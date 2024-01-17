import { Component } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Cart, Summary } from 'src/data-type';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent {
constructor(private serviceproduct:ProductsService,private route:Router,private toast:ToastrService){}
cartDetails:Cart[]|undefined;
summary :Summary = {
  price:0,
  total:0,
  discount:0,
  delievery:0,
  tax:0
}

ngOnInit(){
this.LoadSummary();
}


LoadSummary(){
  this.serviceproduct.GetCartSummary().subscribe((response)=>{
    if(response && response.length!==0){
      console.log(response)
      this.cartDetails = response;
      let price = 0;
      response.forEach((item)=>{
          price = price + (+item.productprice * + item.quantity);  // converting to number 
          console.log(price);
      });
      this.summary.price = price;
      this.summary.discount = price/1000;
      this.summary.tax=price/100;
      this.summary.delievery=100;
      this.summary.total = this.summary.price+this.summary.delievery-this.summary.discount+this.summary.tax
    
    
    } 
    else{
      this.cartDetails= undefined
    }

  })
}



checkout(){
this.route.navigate(['/checkout'])
}

RemoveToCart(cid:number|undefined){
  let user = localStorage.getItem('user');
  let userid = user && JSON.parse(user)[0].id;

  cid &&
    this.serviceproduct
      .RemoveItemFromCartAfterLogin(cid)
      .subscribe((response) => {
        if(response){
          this.serviceproduct.GetCartListAfterLogin(userid);
          this.LoadSummary();
          this.toast.info('Item Removed from Cart', 'Cart', {
            progressBar: true,
            closeButton: true,
          });
          
        }
      });

}

}
