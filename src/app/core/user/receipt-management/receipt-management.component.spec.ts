import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptManagementComponent } from './receipt-management.component';

describe('ReceiptManagementComponent', () => {
  let component: ReceiptManagementComponent;
  let fixture: ComponentFixture<ReceiptManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
