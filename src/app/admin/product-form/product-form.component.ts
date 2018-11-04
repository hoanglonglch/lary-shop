import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any[]>;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getListCategories().snapshotChanges();

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

  ngOnInit() {

  }

}
