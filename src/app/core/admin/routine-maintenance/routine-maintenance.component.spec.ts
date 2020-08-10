import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RoutineMaintenanceComponent } from "./routine-maintenance.component";

describe("RoutineMaintenanceComponent", () => {
  let component: RoutineMaintenanceComponent;
  let fixture: ComponentFixture<RoutineMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoutineMaintenanceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
