import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../service/product.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any[]>;
  productForm: FormGroup;
  isSubmit = false;

  constructor(categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private productService: ProductService) {

    this.categories$ = categoryService.getListCategories()
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            return ({ key: a.key, ...a.payload.val() });
          })
        ));

    // This method will return node's key and node's value are compied
    /*this.categoryService.getListCategories().snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          console.log('a', a.key);
          console.log('payload', a.payload.val());
          return ({ key: a.key, ...a.payload.val() });
        })
      )
    ).subscribe(items => {
      console.log('items', items)
      return items.map(item => {
        console.log('item', item);
        return item.key;
      });
    });*/

    // This function will return all the node's value
    /*this.categoryService.getListCategories()
      .valueChanges()
      .subscribe(data => {
        console.log('data', data);
      });*/

  }

  get title() {
    return this.productForm.get('title');
  }
  get price() {
    return this.productForm.get('price');
  }
  get category() {
    return this.productForm.get('category');
  }
  get imageURL() {
    return this.productForm.get('imageURL');
  }

  ngOnInit() {
    this.productForm = this.initProductForm();
  }

  submitProductForm() {
    console.log('[ProductFormComponent][submitProductForm()] productForm value', this.productForm.value);
    let product = this.productForm.value;
    this.isSubmit = this.productForm.invalid;
    this.productService.createProduct(product);
  }

  initProductForm() {
    return this.formBuilder.group({
      title: ['', [
        Validators.required
      ]],
      price: ['', [
        Validators.required
      ]],
      category: ['', [
        Validators.required
      ]],
      imageURL: ['', [
        Validators.required
      ]]
    });
  }

}
