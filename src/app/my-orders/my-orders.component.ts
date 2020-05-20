import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit { 
  @Input('order$') order$: Observable<any[]>;
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 
      
  
  }
  
  ngOnInit() {
    this.order$ = this.authService.user$.pipe(switchMap(user => this.orderService.getOrdersByUser(user.uid)));
  }

}
