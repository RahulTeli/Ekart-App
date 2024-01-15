import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { Product } from 'src/data-type';
import { SearchService } from '../service/search.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(private activeroute:ActivatedRoute,private searchservice:SearchService){
    
  }

  proudctList:Product[] | undefined  = [];
  ngOnInit(){
    this.proudctList = this.searchservice.ReturnValueMeth();
  }
  
 

}
