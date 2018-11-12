import { Injectable } from '@angular/core';
import { AngularFireDatabase  } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  createProduct(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('products');
  }

  getProduct(fireBaseProductID) {
    return this.db.object('products/' + fireBaseProductID).valueChanges();
  }

  updateProduct(fireBaseProductID, product) {
    return this.db.object('products/' + fireBaseProductID).update(product);
  }

  deteleProduct(fireBaseProductID) {
    return this.db.object('products/' + fireBaseProductID).remove();
  }

  getProductByCategory(categoryName: string) {
    if (!categoryName) return this.getAll();

    return this.db.list('/products', ref => {
      return ref.orderByChild('category').equalTo(categoryName);
    });
  }


}
