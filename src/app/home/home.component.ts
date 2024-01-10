import { Component } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Product } from 'src/data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  proudctsImage:Product[] = [];
  productList:Product[] = [];


  constructor(private productservice:ProductsService){}
  ngOnInit(){
    this.productservice.popularProduct().subscribe((response)=>{
      if(response){
            this.proudctsImage = response;
      }
    })

    this.productservice.listProduct().subscribe((response)=>{
      if(response){
        this.productList = response;
      }
    })

  }
}
