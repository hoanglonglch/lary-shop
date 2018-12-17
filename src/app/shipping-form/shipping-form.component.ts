import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Order} from '../../models/order';
import {ShoppingCart} from '../../models/shopping-cart';
import {OrderService} from '../order.service';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {

  shippingForm: FormGroup;
  @Input('cart') cart: ShoppingCart;
  userId: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private orderService: OrderService,
              private router: Router) {
    this.shippingForm = this.initForm();
  }

  ngOnInit() {
    this.authService.user$.pipe(take(1)).subscribe(data => {
      this.userId = data.uid;
    });
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

  async placeOrder() {
    console.log('this.userId', this.userId);
    if (this.shippingForm.valid) {
      let order = new Order(this.userId, this.shippingForm.value, this.cart);

      let result = await this.orderService.storeOrder(order);
      console.log('orderId', result.key);
      this.router.navigate(['order-success', result.key]);
    }
  }

}
