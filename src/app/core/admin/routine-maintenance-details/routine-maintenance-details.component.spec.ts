import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineMaintenanceDetailsComponent } from './routine-maintenance-details.component';

describe('RoutineMaintenanceDetailsComponent', () => {
  let component: RoutineMaintenanceDetailsComponent;
  let fixture: ComponentFixture<RoutineMaintenanceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutineMaintenanceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineMaintenanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
