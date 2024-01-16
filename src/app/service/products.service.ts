import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TagContentType } from '@angular/compiler';
import { Cart, Order, Product } from 'src/data-type';
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
      let Cart = localStorage.getItem('localCart');
      if(!Cart){
        localStorage.setItem('localCart',JSON.stringify([data]));
        Cart = localStorage.getItem('localCart');
        cartData = Cart && JSON.parse(Cart);
        this.cartdata.emit(cartData);  //sending event emitter object with data
      }
      else{
        cartData = JSON.parse(Cart);
        cartData.push(data);
        localStorage.setItem('localCart',JSON.stringify(cartData));
        this.cartdata.emit(cartData);  //sending event emitter object with data
      }
    }


    // remove item from cart before login
    RemoveItemFromCart(productid:number){
  
      let CartData = localStorage.getItem('localCart');
      if(CartData){
        let items:Product[] =  JSON.parse(CartData);
         items = items.filter((item:Product)=> productid !== item.id); 
         localStorage.setItem('localCart',JSON.stringify(items));
         this.cartdata.emit(items);  //sending event emitter object with data
        }
      

    }

    //add to cart functionality after user login
    AddtoCartAfterLogin(Data:Cart){
      return this.client.post('http://localhost:3000/cart',Data);
    }

    // get cart list after login
    GetCartListAfterLogin(userId:number){
       this.client.get<Product[]>('http://localhost:3000/cart?userid='+userId,{observe:'response'}).subscribe((result)=>{
       if(result && result.body){
        this.cartdata.emit(result.body);
       }
       
       })

    }

    //remove cart from database after login
    RemoveItemFromCartAfterLogin(pid:number){

      return  this.client.delete<Product>(`http://localhost:3000/cart/${pid}`);

    }

    // getting cart summary for summary details 
    GetCartSummary(){
      let user  = localStorage.getItem('user');
      let userid = user && JSON.parse(user)[0].id;
      return this.client.get<Cart[]>('http://localhost:3000/cart?userid='+userid);
    }

    //adding order data to db
    OrderNow(orderdata:Order){
      return this.client.post<Order>('http://localhost:3000/order',orderdata);
    }

}
