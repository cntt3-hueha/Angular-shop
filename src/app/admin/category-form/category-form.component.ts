import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categori = {};
  id;
  categories: any[];
  constructor(
    private categoriesService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private database: AngularFireDatabase, 
  ) { 
    database.list('/categories').valueChanges()   // returns observable
    .subscribe(list=> {
    this.categories = list;
 });
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.categoriesService.get(this.id).valueChanges().pipe(take(1)).subscribe
    (p => this.categori = p);
    
  }
  save(product){
    if(this.id) this.categoriesService.update(this.id,product);
    else this.categoriesService.create(product);

    
    this.router.navigate(['/admin/admin-category/new']);
  }
  delete(){
    if(!confirm('Are you sure you want to delete this product?')) return;
    {
      this.categoriesService.delete(this.id);
      this.router.navigate(['/admin/admin-category/new']);
    }
  }
  ngOnInit() {
  }
  

}
