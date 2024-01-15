import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/data-type';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent {

      productList:Product | undefined ;
      quantity:number=1;

      constructor(private activeroute:ActivatedRoute,private serviceproduct:ProductsService){}

      ngOnInit(){
       let id =  this.activeroute.snapshot.paramMap.get('productid')
       console.log(id);

       id && this.serviceproduct.getProduct(id).subscribe((response)=>{
        console.log(response);
        if(response){
            this.productList = response;
            console.log(this.productList);
        }
        else{
          this.productList = undefined
        }
       })

      }


      handleQuant(val:string){
          if(this.quantity<20 && val=='add'){
            this.quantity +=1;
          }
          if(this.quantity>1 && val=='min'){
              this.quantity -=1;
          }
      }
}
