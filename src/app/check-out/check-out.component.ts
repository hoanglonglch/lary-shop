import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../service/cart.service';
import {ShoppingCart} from '../../models/shopping-cart';
import {take} from 'rxjs/operators';
import {OrderService} from '../order.service';
import {ShoppingCartItem} from '../../models/shopping-cart-item';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  shipping = {};
  shippingForm: FormGroup;
  cart: ShoppingCart;

  constructor(private fb: FormBuilder,
              private cartService: CartService,
              private orderService: OrderService) {
    this.shippingForm = this.initForm();
  }

  async ngOnInit(){
    let cart$ = await this.cartService.getCart();
    cart$.valueChanges().pipe(take(1)).subscribe((cart: ShoppingCart) => {
      console.log('data', cart);
      this.cart = new ShoppingCart(cart.items);
    });
  }


  placeOrder() {
    if (this.shippingForm.valid) {
      let order = {
        dateCreated: new Date().getTime(),
        shipping: this.shippingForm.value,
        items: this.cart.listItems.map((item: ShoppingCartItem) => {
          return {
            product: {
              title: item.product.title,
              imageUrl: item.product.imageUrl,
              price: item.product.price
            },
            quantity: item.quantity,
            totalPrice: item.totalPrice
          };
        })
      };

      this.orderService.storeOrder(order);
    }

  }

  initForm() {
    return this.fb.group({
      name: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]],
      city: ['', [
        Validators.required
      ]]
    });
  }
}
