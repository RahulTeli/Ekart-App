import { Component } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Order } from 'src/data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  constructor(private serviceproduct:ProductsService){}

  orderdet:Order[]|undefined;
  ngOnInit(){
    this.getOrderList();
    
  }

  cancelOrder(oid:number|undefined){
    oid && this.serviceproduct.CancelOrder(oid).subscribe((response)=>{
      if(response){
        this.getOrderList();
      }
    })
  }

  getOrderList(){
    this.serviceproduct.GetOrderDetails().subscribe((response)=>{
      if(response && response.length!=0){
   
        this.orderdet = response;
      }
      else{
        this.orderdet = undefined
      }
    })
  }
}
