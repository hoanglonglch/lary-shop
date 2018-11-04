///<reference path="../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Injectable, OnInit} from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnInit {
  constructor(private af: AngularFireDatabase) { }

  ngOnInit(): void {
  }

  getListCategories() {
    /*return this.af.list('/categories', ref => {
      console.log('[CategoryService][ngOnInit()]{categories}', ref);
      return ref.limitToFirst(5);*/
    return this.af.list('/categories');
  }


}
