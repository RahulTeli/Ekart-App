import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSeller, Product } from 'src/data-type';
import { ProductsService } from '../service/products.service';
import { SearchComponent } from '../search/search.component';
import { SearchService } from '../service/search.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor(private route:Router,private servicesearch:SearchService,private serviceproduct:ProductsService){}

menuType:string = 'default';
Name:string|undefined
userName:string|undefined;

suggestResult:Product [] | undefined= [];

ngOnInit(){    // checking on which route we are and setting header according to that after login 
  this.route.events.subscribe((response:any)=>{
    if(response.url){
      if(localStorage.getItem('seller') && response.url.includes('seller')){

        this.menuType = 'seller';
        if(localStorage.getItem('seller')){
            let data = localStorage.getItem('seller');
            let sellerdata = data && JSON.parse(data)[0];
            console.log(sellerdata);
            this.Name = sellerdata.Name;
            console.log(this.Name)
        }
      
      }
      else if(localStorage.getItem('user')){

        this.menuType = 'user';
        if(localStorage.getItem('user')){
          let data = localStorage.getItem('user');
          let userdata = data && JSON.parse(data)[0];
          console.log(userdata);
          this.userName = userdata.Name;
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

    if(element.value.length==0){
      this.suggestResult = undefined;
    }
    else{
      this.serviceproduct.suggestProduct(element.value).subscribe((response)=>{
        if(response.length >3){
          response.length = 3;
        }
       
          this.suggestResult = response;
    })
    }

  
  }

 }

 hideSuggest(){
  this.suggestResult = undefined;
 }

 searchSubmit(query:string){
  this.servicesearch.searchmeth(query);
  
 }

 suggestSearch(query:string){
  debugger
  this.servicesearch.searchmeth(query);
 }

sellerlogout()
{
  localStorage.removeItem('seller');
  this.route.navigate(['/']);
}
userlogout(){
  localStorage.removeItem('user');
    this.route.navigate(['/']);
}

}
