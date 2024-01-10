import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/data-type';
import { ProductsService } from '../service/products.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {

  constructor(private route:ActivatedRoute,private productservice:ProductsService,private toast:ToastrService){}

  productData:Product|undefined;
  ngOnInit():void{
    let productId = this.route.snapshot.paramMap.get('id');

    productId && this.productservice.getProduct(productId).subscribe((response)=>{
        
      this.productData = response;
      
    });
  }

    updateProductSubmit(formdata:Product){
      if(this.productData){
        formdata.id=this.productData.id;
      }

      Swal.fire({                   //confirmation dialog
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

          this.productservice.updateProduct(formdata).subscribe((response)=>{   //updating 
        
            if(response){
                this.toast.success("Updated Successfully","Update");
            }
          })

        }
      });


        
    }
}
