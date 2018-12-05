import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {CartService} from '../service/cart.service';
import {Item} from '../../models/item';
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

  quantity = 0;

  constructor (private cartService: CartService) { }

  ngOnInit() {
    let items$ = this.cartService.getQuantity(this.product.key).valueChanges().subscribe((items: Item[]) => {
      items.forEach(item => {
        if (item.product.key === this.product.key) {
          this.quantity = item.quantity;
        }
      });
    });

    this.getQuantity();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getQuantity() {

    console.log('this.shoppingCart', this.shoppingCart);
    /*this.shoppingCart.items.forEach(item => {
      console.log('item', item);
    });*/
  }

}
