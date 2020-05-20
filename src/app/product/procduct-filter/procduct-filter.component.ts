import { CategoryService } from './../../category.service';
import { ProductService } from './../../product.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

import { Component, OnInit, Input } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-product-filter',
  templateUrl: './procduct-filter.component.html',
  styleUrls: ['./procduct-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category;
  products: any[] = [];
  subscription: Subscription
  filteredProducts: any[] = [];
  categories: any[];

  constructor(private productService: ProductService, 
    private database: AngularFireDatabase, 
    private categoryService: CategoryService){
    this.subscription=  database.list('/categories').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    ).subscribe(items => {
      this.filteredProducts=this.categories = items;
    });
  }
  ngOnInit() {
  }

}
