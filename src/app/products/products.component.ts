import { Component, OnInit } from '@angular/core';
import {Observable, pipe} from 'rxjs';
import {ProductService} from '../service/product.service';
import {CategoryService} from '../service/category.service';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

// TODO [ToRead]:  Using nested observable
export class ProductsComponent implements OnInit {

  filteredProduct: Product [];
  products: Product [] = [];
  categories$: Observable<any []>;
  queryParam: string;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.categories$ = this.categoryService.getListCategories()
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            return ({ key: a.key, ...a.payload.val() });
          })
        ));

    // [ToRead]
    /*this.productService.getAll().valueChanges().subscribe( products => {
      console.log('products in on init', products);
      this.products = products as Product [];

      console.log('queryParam', this.route.snapshot.queryParamMap.get('category'));
    });

    this.route.queryParamMap.subscribe(queryParam => {
      this.queryParam = queryParam.get('category');
      console.log('products in query', this.products);

      this.filteredProduct = this.queryParam
        ? this.products.filter(p => p.category === this.queryParam)
        : this.products;
    });*/

    this.productService.getAll().valueChanges().pipe(
      switchMap( (products: Product []) => {
        this.products = products;
        return this.route.queryParamMap;
      })
    ).subscribe( paramMap => {
      let queryParam = paramMap.get('category');

      this.filteredProduct = queryParam
        ? this.products.filter(product => product.category === queryParam)
        : this.products;
    });
  }

}
