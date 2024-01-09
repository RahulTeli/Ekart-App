import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TagContentType } from '@angular/compiler';
import { Product } from 'src/data-type';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  
  constructor(private client: HttpClient,private toast:ToastrService) {}

  // adding products
  addProduct(formdata: Product) {
    this.client
      .post<Product>('http://localhost:3000/products', formdata, { observe: 'response' })
      .subscribe((response) => {
          this.toast.success('Product Added','Success')
      },
      (error)=>{
        this.toast.error('Something went wrong','Error')
      });
  }

  showProducts(){
    return this.client.get<Product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: number) {
   return  this.client.delete<Product>(`http://localhost:3000/products/${id}`);
  }


}
