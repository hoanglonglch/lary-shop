import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private database: AngularFireDatabase) {
  }

  storeOrder(order){
    return this.database.list('/orders').push(order);
  }
}
