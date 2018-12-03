import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {CartService} from '../service/cart.service';
import {Item} from '../../models/item';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Input('isShowAddToCart') isShowAddToCart = false;
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
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

}
