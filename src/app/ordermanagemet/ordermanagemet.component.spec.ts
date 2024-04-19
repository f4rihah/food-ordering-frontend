import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdermanagemetComponent } from './ordermanagemet.component';

describe('OrdermanagemetComponent', () => {
  let component: OrdermanagemetComponent;
  let fixture: ComponentFixture<OrdermanagemetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdermanagemetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdermanagemetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
