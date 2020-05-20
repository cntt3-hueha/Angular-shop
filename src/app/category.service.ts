import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { 

  }

  getCategories(): AngularFireList <any[]> {
    return this.db.list('/categories');
  }
  getAll(){
    return this.db.list('/categories').snapshotChanges().pipe( 
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    )
  }
  createcategories(category){
    return this.db.list('/categories').push(category);
  }
  
  get(categoriesId){
    return this.db.object('/categories/' + categoriesId);
  }
  update(categoriesId,categories){
    return this.db.object('/categories/' + categoriesId).update(categories);
   }
  create(categories) {
    return this.db.list('/categories').push(categories);
  }
  delete(categoriesId){
    return this.db.object('/categories/' + categoriesId).remove();
  }

}
