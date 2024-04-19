import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiserviceService } from '../api.service';

@Component({
  selector: 'app-ordermanagemet',
  templateUrl: './ordermanagemet.component.html',
  styleUrls: ['./ordermanagemet.component.scss']
})
export class OrdermanagemetComponent implements OnInit {
  orders$: Observable<any[]> = of([]);  // Initialized as an empty array observable

  constructor(private apiService: ApiserviceService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orders$ = this.apiService.getAllOrders().pipe(
      catchError(error => {
        console.error('Error loading orders:', error);
        return of([]);  // Return an empty array on error
      })
    );
  }

  deleteOrder(orderId: number) {
    this.apiService.deleteOrder(orderId).subscribe({
      next: () => {
        alert('Order deleted successfully!');
        this.loadOrders(); // Reload the orders after deletion
      },
      error: (error) => {
        alert('Failed to delete order!');
        console.error('Delete error:', error);
      }
    });
  }

  updateOrderStatus(orderId: number, status: string) {
    this.apiService.updateOrderStatus(orderId, { order_status: status }).subscribe({
      next: () => {
        alert('Order status updated successfully!');
        this.loadOrders(); // Reload the orders after update
      },
      error: (error) => {
        alert('Failed to update order status!');
        console.error('Update error:', error);
      }
    });
  }
}
