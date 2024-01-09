import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSeller } from 'src/data-type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor(private route:Router){}

menuType:string = 'default';
sellerName:string = '';

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


logout()
{
  localStorage.removeItem('seller');
  this.route.navigate(['/']);
}

}
