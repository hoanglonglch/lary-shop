import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from '../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<any []>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products$ = this.productService.getAll().valueChanges();
  }

}
