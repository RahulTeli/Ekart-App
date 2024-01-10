import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSeller, Product } from 'src/data-type';
import { ProductsService } from '../service/products.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor(private route:Router,private serviceproduct:ProductsService){}

menuType:string = 'default';
sellerName:string = '';
suggestResult:Product [] | undefined= [];

ngOnInit(){    // checking on which route we are and setting header according to that after login 
  this.route.events.subscribe((response:any)=>{
    if(response.url){
      if(localStorage.getItem('seller') && response.url.includes('seller')){

        this.menuType = 'seller';
        if(localStorage.getItem('seller')){
            let data = localStorage.getItem('seller');
            let sellerdata = data && JSON.parse(data)[0];
            this.sellerName = sellerdata.Name;
        }
      }
      else{
        this.menuType = 'default';
      }
    }
   
  })
}

 Suggest(query:KeyboardEvent)
 {

  if(query){
    const element = query.target as HTMLInputElement;

    if(element.value.length <0){
      this.suggestResult = undefined;
    }

    this.serviceproduct.suggestProduct(element.value).subscribe((response)=>{
        if(response.length >3){
          response.length = 3;
        }
          this.suggestResult = response;
    })
  }

 }

 hideSuggest(){
  this.suggestResult = undefined;
 }

logout()
{
  localStorage.removeItem('seller');
  this.route.navigate(['/']);
}

}
