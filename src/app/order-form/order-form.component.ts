import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ApiserviceService } from '../api.service';

interface Food {
  id: string;  // Ensure types align with your backend expectations.
  name: string;
  price: number;
}
declare var bootstrap: any;

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  foods$: Observable<Food[]> = of([]);
  

  constructor(private fb: FormBuilder, private apiService: ApiserviceService, private router: Router ) {
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],
      tableNumber: ['', Validators.required],
      foods: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadFoods();
  }

  loadFoods(): void {
    this.foods$ = this.apiService.getAllfoods();
  }

  get foods(): FormArray {
    return this.orderForm.get('foods') as FormArray;
  }

  addFoodToOrder(food: Food): void {
    const foodGroup = this.fb.group({
      foodId: [food.id, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
    this.foods.push(foodGroup);
  }

  submitOrder(): void {
    if (this.orderForm.valid) {
      const foodsFormatted = this.orderForm.value.foods.map((f: { foodId: string, quantity: string }) => ({
        id: parseInt(f.foodId, 10),  // Ensure IDs are integers
        quantity: parseInt(f.quantity, 10)  // Ensure quantities are integers
      }));
  
      const orderData = {
        id: '13',  // This needs to be dynamically determined based on your application's context
        customerName: this.orderForm.value.customerName,
        tableNumber: this.orderForm.value.tableNumber,
        cart: { products: foodsFormatted }
      };
  
      // Call to API service to create order
      this.apiService.createOrder(orderData).subscribe({
        next: (res) => {
            console.log('Order placed successfully', res);
            this.showSuccessModal(); // Ensure this is called here after successful submission
        },
        error: (err) => {
            console.error('Error placing order:', err);
            // Optionally handle user feedback on failure here
        }
    });
} else {
    console.error('Form is invalid:', this.orderForm.value);
    // Optionally notify user the form is invalid
}
  }


  showSuccessModal(): void {
    setTimeout(() => { // Added a timeout to ensure the DOM is fully loaded
        const successModalElement = document.getElementById('successModal');
        if (successModalElement) {
            const successModal = new bootstrap.Modal(successModalElement);
            successModal.show();
        } else {
            console.error('Modal element not found in the DOM');
        }
    }, 500); // Delay might need adjustment based on your application's behavior
}

  redirectToHome(): void {
    this.router.navigate(['/']); // Assuming '/' is your home route
  }
  
}
