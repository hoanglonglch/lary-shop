import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../service/category.service';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';


import {ActivatedRoute, ParamMap} from '@angular/router';
import {ProductService} from '../service/product.service';
import {Product} from '../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories$: Observable<any []>;
  products: Product[];

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getListCategories()
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            return ({ key: a.key, ...a.payload.val() });
          })
        ));

    this.route.queryParamMap.pipe(
      switchMap((queryParam: ParamMap) => {
        console.log('category', queryParam.get('category'));
        return this.productService.getProductByCategory(queryParam.get('category')).valueChanges();
      })
    ).subscribe( products => {
      this.products = products as Product[];
    });

  }

}
