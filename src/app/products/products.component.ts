import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from '../service/product.service';
import {CategoryService} from '../service/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<any []>;
  categories$: Observable<any []>;

  constructor(private productService: ProductService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.products$ = this.productService.getAll().valueChanges();
    this.categories$ = this.categoryService.getListCategories().valueChanges();
  }

}
