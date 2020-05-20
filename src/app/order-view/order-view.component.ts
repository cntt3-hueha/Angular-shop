import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { ShoppingCart } from '../modules/shopping-cart';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  order$;
  orderId;
  items;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.order$ = this.orderService.getOrdersById(this.orderId);
  }
  netPrice() {
    let sum = 0;
    for (let productId in this.items)
      sum+=this.items[productId].totalPrice;
    return sum;
   }

  delete(){
    if(!confirm('Are you sure you want to delete this product?')) return;
    {

      this.orderService.delete(this.orderId);
      this.router.navigate(['/my/orders']);
    }
  }

}
