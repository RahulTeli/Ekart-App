import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from 'src/data-type';
import { ProductsService } from '../service/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent {
  productList: Product | undefined;
  quantity: number = 1;
  removecart: boolean = false;
  cartdataforremovecart: undefined | Product;

  constructor(
    private activeroute: ActivatedRoute,
    private serviceproduct: ProductsService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    let id = this.activeroute.snapshot.paramMap.get('productid');

    id &&
      this.serviceproduct.getProduct(id).subscribe((response) => {
        if (response) {
          this.productList = response;

          /// ------------------ remove cart functionality ----------------
          let cartData = localStorage.getItem('localCart');

          if (id && cartData) {
            let items = JSON.parse(cartData);

            items = items.filter((val: Product) => id == val.id.toString());

            if (items.length) {
              this.removecart = true;
            } else {
              this.removecart = false;
            }
          }
        } else {
          this.productList = undefined;
        }

        let userdata = localStorage.getItem('user');
        if (userdata) {
          let userid = userdata && JSON.parse(userdata)[0].id;
          this.serviceproduct.GetCartListAfterLogin(userid);
          this.serviceproduct.cartdata.subscribe((result) => {
            let item = result.filter(
              (product: Product) =>
                id?.toString() === product.productid?.toString()
            );
            if (item.length) {
              this.cartdataforremovecart = item[0];
              this.removecart = true;
            }
          });
        }
      });
  }

  handleQuant(val: string) {
    if (this.quantity < 20 && val == 'add') {
      this.quantity += 1;
    }
    if (this.quantity > 1 && val == 'min') {
      this.quantity -= 1;
    }
  }

  AddtoCart() {
    if (this.productList) {
      this.productList.quantity = this.quantity;
      if (!localStorage.getItem('user')) {
        /////////////////////////// if user is not logged in
        this.serviceproduct.LocalAddtoCart(this.productList);
        this.toast.show('Item Added in Cart', 'Cart', {
          progressBar: true,
          closeButton: true,
        });
        this.removecart = true;
      } else {
        /////////////////////////////////  if user is logged in

        let userdata = localStorage.getItem('user');
        let userid = userdata && JSON.parse(userdata)[0].id;
        let cartData: Cart = {
          ...this.productList,
          productid: this.productList.id,
          userid,
        };
        delete cartData.id;

        this.serviceproduct
          .AddtoCartAfterLogin(cartData)
          .subscribe((response) => {
            this.toast.show('Item Added in Cart', 'Cart', {
              progressBar: true,
              closeButton: true,
            });

            this.serviceproduct.GetCartListAfterLogin(userid);
            this.removecart = true;
          });
      }
    }
  }

  RemovetoCart(productid: number) {
    if (!localStorage.getItem('user')) {                        ////// if user is not logged in
      this.serviceproduct.RemoveItemFromCart(productid);      
      this.removecart = false;
      this.toast.info('Item Removed from Cart', 'Cart', {
        progressBar: true,
        closeButton: true,
      });
    } else {                                      /////// if user is logged in

      let user = localStorage.getItem('user');
      let userid = user && JSON.parse(user)[0].id;

      this.cartdataforremovecart &&
        this.serviceproduct
          .RemoveItemFromCartAfterLogin(this.cartdataforremovecart.id)
          .subscribe((response) => {
            if(response){
              this.serviceproduct.GetCartListAfterLogin(userid);
              this.toast.info('Item Removed from Cart', 'Cart', {
                progressBar: true,
                closeButton: true,
              });
              this.removecart = false;
            }
          });
    }
  }
}
