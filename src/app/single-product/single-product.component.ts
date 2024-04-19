import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiserviceService } from '../api.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  food$!: Observable<any>;  // Use '!' to promise TypeScript that the variable will be definitely assigned

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiserviceService
  ) { }

  ngOnInit(): void {
    this.food$ = this.route.params.pipe(
      switchMap(params => {
        const foodId = +params['id'];  // Convert 'id' to a number
        return this.apiService.getFoodById(foodId);
      })
    );
  }
}
