import { EventEmitter, Injectable } from '@angular/core';
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

    /// show list of products
  showProducts(){
    return this.client.get<Product[]>('http://localhost:3000/products');
  }

    // delete products
  deleteProduct(id: number) {
   return  this.client.delete<Product>(`http://localhost:3000/products/${id}`);
  }

  // get single product values for updating purpose
  getProduct(id:string){
    return this.client.get<Product>(`http://localhost:3000/products/${id}`);
  }

  //update product
  updateProduct(data:Product){
    return this.client.put<Product>(`http://localhost:3000/products/${data.id}`,data);
  }

  //popularProductShow
  popularProduct(){
    return this.client.get<Product[]>('http://localhost:3000/products/?_limit=3');
  }

    //shown product list on home page
    listProduct(){
      return this.client.get<Product[]>('http://localhost:3000/products/?_limit=8');
    }

     //suggestion when searching
     suggestProduct(query:string){
      return this.client.get<Product[]>(`http://localhost:3000/products?q=${query}`);
    }

    // adding cart data to local storage if user is not login and showing cart number 
    cartdata = new EventEmitter<Product[] | []>();  // creating event emitter object
    LocalAddtoCart(data:Product){
      let cartData =[];
      let localCart = localStorage.getItem('localCart');
      if(!localCart){
        localStorage.setItem('localCart',JSON.stringify([data]));
        
      }
      else{
        cartData = JSON.parse(localCart);
        cartData.push(data);
        localStorage.setItem('localCart',JSON.stringify(cartData));
        this.cartdata.emit(cartData);  //sending event emitter object with data
      }
    }

}
