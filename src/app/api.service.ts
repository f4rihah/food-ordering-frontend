import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  private baseUrl = 'http://localhost:8080'; // Base URL for API
  private imageBaseUrl = 'http://localhost/food-ordering-backend/public/uploads/'; // Base URL for images
  private loggedInStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  getAllfoods(): Observable<any[]> {
    return this.http.get<{data: any[]}>(`${this.baseUrl}/foods`).pipe(
      map(response => {
        // Check if data exists and is an array; otherwise return an empty array
        if (!response.data || !Array.isArray(response.data)) {
          console.error('Data is not an array:', response.data);
          return [];
        }

        return response.data.map(food => {
          const imageUrl = food.image ? `${this.imageBaseUrl}${food.image}` : 'https://via.placeholder.com/150';
          console.log('Constructed Image URL:', imageUrl); // Log the constructed URL to verify it
          return {
            ...food,
            imageUrl: imageUrl  // Attach the full image URL to each food item
          };
        });
      }),
      catchError(error => {
        console.error('Error fetching foods:', error);
        return throwError(() => new Error('Failed to load foods'));
      })
    );
  }

  getFoods(category?: string): Observable<any[]> {
    let url = `${this.baseUrl}/foods`;
    if (category) {
      url += `?category=${category}`;
    }
    return this.http.get<{data: any[]}>(url).pipe(
      map(response => response.data.map(food => ({
        ...food,
        imageUrl: food.image ? `${this.imageBaseUrl}${food.image}` : 'https://via.placeholder.com/150'
      }))),
      catchError(error => {
        console.error('Error fetching foods:', error);
        return throwError(() => new Error('Failed to load foods'));
      })
    );
  }


  createOrder(orderData: any): Observable<any> {
    console.log('Submitting Order:', orderData);
    return this.http.post(`${this.baseUrl}/orders/create`, orderData).pipe(
      catchError(error => {
        console.error('Error placing order:', error);
        return throwError(() => new Error('Failed to create order'));
      })
    );
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData).pipe(
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(() => new Error('Failed to register user'));
      })
    );
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, userData).pipe(
      map(response => {
        if (response.token) {
          localStorage.setItem('userToken', response.token);
          localStorage.setItem('isAdmin', response.user.isAdmin);
          this.loggedInStatus.next(true);
          if (response.user.isAdmin) {
            this.router.navigate(['/ordermanagement']); // Navigate to order management if admin
          } else {
            this.router.navigate(['/']); // Navigate to home if not admin
          }
        }
        return response;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Failed to login'));
      })
    );
  }

  // Inside ApiserviceService

isAdmin(): Observable<boolean> {
  return this.isLoggedIn().pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        const isAdmin = localStorage.getItem('isAdmin') === '1';
        return isAdmin;
      }
      return false;
    })
  );
}


  isLoggedIn() {
    return this.loggedInStatus.asObservable();
  }

  logoutUser() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('isAdmin');
    this.loggedInStatus.next(false);
    this.router.navigate(['/login']); // Redirect to login page on logout
  }


  getAllOrders(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/orders`).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Failed to get orders:', error);
        return throwError(() => new Error('Failed to load orders'));
      })
    );
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/orders/${orderId}`).pipe(
      catchError(error => {
        console.error('Error deleting order:', error);
        return throwError(() => new Error('Failed to delete order'));
      })
    );
  }

  updateOrderStatus(orderId: number, data: { order_status: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/orders/${orderId}`, data).pipe(
      catchError(error => {
        console.error('Error updating order status:', error);
        return throwError(() => new Error('Failed to update order status'));
      })
    );
  }

  getFoodById(foodId: number): Observable<any> {
    return this.http.get<{data: any}>(`${this.baseUrl}/food/${foodId}`).pipe(
      map(response => ({
        ...response.data,
        imageUrl: response.data.image ? `${this.imageBaseUrl}${response.data.image}` : 'https://via.placeholder.com/150'
      })),
      catchError(error => {
        console.error('Error fetching food:', error);
        return throwError(() => new Error('Failed to load food details'));
      })
    );
  }
  

  
}
