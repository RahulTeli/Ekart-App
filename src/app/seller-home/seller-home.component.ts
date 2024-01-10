import { Component } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Product } from 'src/data-type';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {

  constructor(private productservice:ProductsService,private toast :ToastrService){}
  
  //productList :undefined | Product[];
  //or 
   productList :Product[] = [];


  ngOnInit(){
    this.List();
  }

  List(){
    this.productservice.showProducts().subscribe((response)=>{
     
      if(response){
        this.productList = response;      
      }
      if( response.length==0){
          this.toast.error("No Data Found !","Message");
      } 
    })
  }
  edProduct(id:number)
  {

  }
  delProduct(id:number){
    
    Swal.fire({                               // confirm dialog box 
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // ------------------ calling method after confirmation -------------

        this.productservice.deleteProduct(id).subscribe((response)=>{
          this.toast.success("Product Deleted Successfully","Delete")
          this.List();
        })


      }
    });



   

  }



}
