import {Product} from './product';

export class ShoppingCartItem {
  product: Product;
  quantity: number;


  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  get totalPrice() {
    return +this.product.price * this.quantity;
  }
}
