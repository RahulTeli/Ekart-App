import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from 'src/data-type';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Injectable({
  providedIn: 'root',
})
export class SearchService {

  constructor(private serviceproduct:ProductsService,private route:Router) { }

  public productList:Product[] | undefined= [];
  query :string='';



  ReturnValueMeth():Product[]|undefined{
    return this.productList;
  }

  searchmeth(querydata:string):void{
    querydata && this.serviceproduct.suggestProduct(querydata).subscribe((response:any)=>{
      if(response.length!=0){
        this.productList = response;
        this.route.navigate([`/search/${querydata}`]);
      }
      else{
        this.productList = undefined;
      }
       
    })
  }

}
