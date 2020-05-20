import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  categories: any[];
  category= {};
  name;
  filteredCategory : any[];
  supcription: Subscription;
  constructor(private categoryService: CategoryService, 
    private route: ActivatedRoute,
    private database: AngularFireDatabase, 
    private productService: ProductService,
    private categoriesService: CategoryService,
    private router: Router) { 
      this.supcription=  categoriesService.getAll().subscribe(items => {
        this.filteredCategory=this.categories = items;
      })
  }
  save(category){
    if(this.name) this.productService.updatecategory(this.category);
    else this.categoriesService.createcategories(this.category);
    this.router.navigate(['/admin/admin-category/new']);
    
  }
  ngOnInit() {
  }

}
