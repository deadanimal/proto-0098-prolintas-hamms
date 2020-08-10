import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmWorkOrderComponent } from './hm-work-order.component';

describe('HmWorkOrderComponent', () => {
  let component: HmWorkOrderComponent;
  let fixture: ComponentFixture<HmWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
