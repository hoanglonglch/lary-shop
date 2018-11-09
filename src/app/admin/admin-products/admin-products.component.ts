import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import { Observable, Subscription } from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Product} from '../../../models/product';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product [];
  filteredProduct: Product [];
  subscription: Subscription

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.subscription = this.productService.getAll()
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            return ({key: a.key, ...a.payload.val()});
          })
        )
      )
      .subscribe((products) => {
        this.filteredProduct = this.products =  products as Product[];
      });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  searchTitle(query: string) {
  //  Filter the product
    this.filteredProduct = (query) ? this.products.filter(product => {
      return (product.title.toLowerCase()).includes(query.toLowerCase());
    }) : this.products;
  }
}
