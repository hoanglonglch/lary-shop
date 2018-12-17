import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../service/cart.service';
import {ShoppingCart} from '../../models/shopping-cart';
import {take} from 'rxjs/operators';
import {OrderService} from '../order.service';
import {ShoppingCartItem} from '../../models/shopping-cart-item';
import {AuthService} from '../service/auth.service';
import {Order} from '../../models/order';
import {Router} from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  shippingForm: FormGroup;
  cart: ShoppingCart;
  userId: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private cartService: CartService,
              private orderService: OrderService,
              private authService: AuthService) {
    this.shippingForm = this.initForm();
  }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    cart$.valueChanges().pipe(take(1)).subscribe((cart: ShoppingCart) => {
      this.cart = new ShoppingCart(cart.items);
    });

    this.authService.user$.pipe(take(1)).subscribe(data => {
      this.userId = data.uid;
    });
  }


  async placeOrder() {
    if (this.shippingForm.valid) {
      let order = new Order(this.userId, this.shippingForm.value, this.cart);

      let orderFirebase = await this.orderService.storeOrder(order);
      console.log('orderId', orderFirebase.key);
      this.router.navigate(['order-success', orderFirebase.key]);
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
