import { Component } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Product } from 'src/data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  constructor(private productservice:ProductsService){}

  addProductSubmit(formdata:Product){

      this.productservice.addProduct(formdata);
      
  }

}
