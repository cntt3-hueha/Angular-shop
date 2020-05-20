import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { Subscription, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ShoppingCart } from '../modules/shopping-cart';


@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private database: AngularFireDatabase, 
    private categoryService: CategoryService,
    private shoppingCartService: ShoppingCartService,
      ) { 
   }

  async ngOnInit() {
    this.cart$= await this.shoppingCartService.getCart();
    this.populateProducts();
       
  }
  private populateProducts(){
    
    this.database.list('/products').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    ).pipe(switchMap(products =>{
        this.products = products
        return this.route.queryParamMap;
      }))
      .subscribe(params =>{
        this.category = params.get('category');
        this.applyFilter();
      });
            
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ? 
    this.products.filter(p => p.category === this.category) :
    this.products;
  }

 
}



