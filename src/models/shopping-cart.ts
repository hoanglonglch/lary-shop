import {ShoppingCartItem} from './shopping-cart-item';
import {Product} from './product';

export class ShoppingCart {
  public listItems: ShoppingCartItem [] = [];

  constructor(public items: {[productId: string]: ShoppingCartItem}) {
    for (let productId in this.items) {
      let item = this.items[productId]
      this.listItems.push( new ShoppingCartItem(item.product, item.quantity));
    }
  }

  get totalItemsCount () {
    let shoppingCartItemCount = 0;
    for (let shoppingCartItem in this.items) {
      shoppingCartItemCount += this.items[shoppingCartItem].quantity;
    }
    return shoppingCartItemCount;
  }

  get totalPrice() {
    let total = 0;
    this.listItems.forEach((shoppingCartItem: ShoppingCartItem) => {
      total += (shoppingCartItem.quantity * (+shoppingCartItem.product.price));
    });

    return total;
  }

  getQuantity(product: Product): number {
    let items = this.items;
    let item = items && items[product.key] as ShoppingCartItem;

    if (item) {
      return item.quantity;
    } else {
      return 0;
    }
  }
}
