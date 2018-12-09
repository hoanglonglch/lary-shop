import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {CartService} from '../service/cart.service';
import {ShoppingCartItem} from '../../models/shopping-cart-item';
import {ShoppingCart} from '../../models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Input('is-show-add-to-cart') isShowAddToCart = false;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor (private cartService: CartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart () {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity(): number {
    let items = this.shoppingCart.items;
    let item = items && items[this.product.key] as ShoppingCartItem;

    if (item) {
      return item.quantity;
    } else {
      return 0;
    }
  }


}
