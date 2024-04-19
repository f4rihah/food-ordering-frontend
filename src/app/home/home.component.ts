import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiserviceService } from '../api.service';  // Correct the import path if necessary
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  foods$: Observable<any[]> = of([]);
  categories: string[] = ['Pizza', 'Burger', 'Sushi', 'Pasta'];  // Example categories
  selectedCategory: string = '';

  constructor(private apiService: ApiserviceService, private router: Router) { }

  ngOnInit(): void {
    this.loadFoods();
  }

  loadFoods(): void {
    this.foods$ = this.apiService.getFoods(this.selectedCategory);
  }


  navigateToProduct(foodId: number) {
    this.router.navigate(['/product', foodId]);
  }
}
