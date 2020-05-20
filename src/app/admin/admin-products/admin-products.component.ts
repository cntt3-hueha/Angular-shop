import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit , OnDestroy {

  dataTable: any;
  products: any[] ;

 
  filteredProducts: any[];
  subscription: Subscription
  constructor(private productService: ProductService, private database: AngularFireDatabase) {
    this.subscription=  productService.getAll().subscribe(items => {
       this.filteredProducts=this.products = items;
  
      
     });
    // .subscribe(items => { l
    //   this.products = items;
    // });
    
    // this.subscription = this.productService.getAll().valueChanges().subscribe(products => this.filteredProducts = this.products = products)
    
  }

  filter(query: string) {
    this.filteredProducts = (query) ? 
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
      this.products;

  }
  ngOnDestroy(){
      this.subscription.unsubscribe();
  }

  ngOnInit(){
   
  }
}
