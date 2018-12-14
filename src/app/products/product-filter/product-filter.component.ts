import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input('categoryQueryParam')
  categoryQueryParam: string;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getListCategories()
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            return ({key: a.key, ...a.payload.val()});
          })
        )
      );
  }

}
