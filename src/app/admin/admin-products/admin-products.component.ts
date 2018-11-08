import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<any[]>;

  constructor(private productService: ProductService) {
    this.products$ = productService.getAll()
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            return ({ key: a.key, ...a.payload.val() });
          })
        )
      );
  }

  ngOnInit() {

  }

}
