import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$;
  orderId;

  constructor(private orderService: OrderService,private database: AngularFireDatabase) { 
   
    
  }

  ngOnInit() {
    this.orders$ = this.orderService.getOrders();
  }

}
