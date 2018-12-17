import {ShoppingCartItem} from './shopping-cart-item';
import {ShoppingCart} from './shopping-cart';

export class Order {

  dateCreated: number;
  items: any [];

  constructor(public userId, public shipping,
              shoppingCart: ShoppingCart) {
    this.dateCreated = new Date().getTime();


    this.items = shoppingCart.listItems.map((item: ShoppingCartItem) => {
      return {
        product: {
          imageUrl: item.product.imageUrl,
          price: item.product.price,
          title: item.product.title
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice
      };
    });
  }
}
