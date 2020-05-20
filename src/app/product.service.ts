import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  
  getAll(){
    
    return this.db.list('/products').snapshotChanges().pipe( 
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    )
  }


  get(productId){
    return this.db.object('/products/' + productId);
  }
  update(productId,product){
   return this.db.object('/products/' + productId).update(product);
  }
  updatecategory(category){
    return this.db.object('/categories/'+ category).update(category);
  }
  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
  

}
