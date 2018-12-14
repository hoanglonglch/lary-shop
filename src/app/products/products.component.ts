import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {CategoryService} from '../service/category.service';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../models/product';
import {CartService} from '../service/cart.service';
import {ShoppingCart} from '../../models/shopping-cart';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

// TODO [ToRead]:  Using nested observable
export class ProductsComponent implements OnInit, OnDestroy {


  filteredProduct: Product [];
  products: Product [] = [];
  categoryQueryParam = '';
  shoppingCart: ShoppingCart;
  subscription: Subscription;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async ngOnInit() {
    // [ToRead]
    /*this.productService.getAll().valueChanges().subscribe( products => {
      console.log('products in on init', products);
      this.products = products as Product [];

      console.log('categoryQueryParam', this.route.snapshot.queryParamMap.get('category'));
    });

    this.route.queryParamMap.subscribe(categoryQueryParam => {
      this.categoryQueryParam = categoryQueryParam.get('category');
      console.log('products in query', this.products);

      this.filteredProduct = this.categoryQueryParam
        ? this.products.filter(p => p.category === this.categoryQueryParam)
        : this.products;
    });*/

    this.productService.getAll().snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          return ({ key: a.key, ...a.payload.val() });
        })
      )).pipe(
      switchMap( (products: Product []) => {
        this.products = products;
        return this.route.queryParamMap;
      })
    ).subscribe( paramMap => {
      this.categoryQueryParam = paramMap.get('category');
      this.applyFilter();

    });

    let shoppingCart$ = await this.cartService.getCart();
    this.subscription = shoppingCart$.valueChanges().subscribe((shoppingCart: ShoppingCart) => {
      this.shoppingCart = new ShoppingCart(shoppingCart.items);
    });

  }

  applyFilter() {
    this.filteredProduct = this.categoryQueryParam
      ? this.products.filter(product => product.category === this.categoryQueryParam)
      : this.products;
  }

}
