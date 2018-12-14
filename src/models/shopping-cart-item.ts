import {Product} from './product';

export class ShoppingCartItem {

  constructor(public product: Product, public quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  get totalPrice() {
    return +this.product.price * this.quantity;
  }
}
