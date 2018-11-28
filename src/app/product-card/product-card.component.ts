import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {CartService} from '../service/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Input('isShowAddToCart') isShowAddToCart = false;

  constructor (private cartService: CartService) { }

  ngOnInit() {
  }

  addToCart(product: Product) {
    console.log('product', product);

    this.cartService.addCart(product);
  }

}
