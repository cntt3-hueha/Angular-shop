import {  map,take } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Product } from './modules/product';

import { ShoppingCart } from './modules/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private database: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.database.object('/shopping-carts/' + cartId).valueChanges().
      pipe(
        map((data: any) => {
          let items: any;
          if(data){
            items=data.items;
          }
          return new ShoppingCart(items);
        })
      )
  }
  async addToCart(product: Product) {
    this.updateItem(product,1);
  }

  async removeFromCart(product: Product) {
   this.updateItem(product,-1);
  }
  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.database.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create(){
    return this.database.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }


  private getItem(cartId: string, productId: string){
    return  this.database.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
 

  

  
  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cardId', result.key);
    return result.key;
    }
  
 

 
  private async updateItem(product: Product,change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {  
    if(item) 
    {
      let quantity = (item.quantity || 0) + change;
      if (quantity === 0) return item$.remove();
      //.then(result => console.log('deleted', result)).catch(err => console.log(err.message));

    item$.update({
      title: product.title,
      imageUrl: product.imageUrl, 
      price: product.price,
      quantity:quantity
    });
  }
    else item$.set({
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: 1
      });   
    });
  }


  

}








