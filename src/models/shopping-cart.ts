import {ShoppingCartItem} from './shopping-cart-item';

export class ShoppingCart {
  public listItems: ShoppingCartItem [] = [];

  constructor(public items: {[productId: string]: ShoppingCartItem}) {
    for (let productId in this.items){
      this.listItems.push(this.items[productId]);
    }
  }

  get totalItemsCount () {
    let shoppingCartItemCount = 0;
    for (let shoppingCartItem in this.items) {
      shoppingCartItemCount += this.items[shoppingCartItem].quantity;
    }
    return shoppingCartItemCount;
  }
}
