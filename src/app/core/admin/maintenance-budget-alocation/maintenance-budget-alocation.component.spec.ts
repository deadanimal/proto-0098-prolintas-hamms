import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MaintenanceBudgetAlocationComponent } from "./maintenance-budget-alocation.component";

describe("MaintenanceBudgetAlocationComponent", () => {
  let component: MaintenanceBudgetAlocationComponent;
  let fixture: ComponentFixture<MaintenanceBudgetAlocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceBudgetAlocationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceBudgetAlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
