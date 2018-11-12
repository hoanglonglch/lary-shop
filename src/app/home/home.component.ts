import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../service/category.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories$: Observable<any []>;

  constructor(private categoryService: CategoryService,
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
  }

}
