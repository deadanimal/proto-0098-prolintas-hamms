import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HeavyMaintenanceComponent } from "./heavy-maintenance.component";

describe("HeavyMaintenanceComponent", () => {
  let component: HeavyMaintenanceComponent;
  let fixture: ComponentFixture<HeavyMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeavyMaintenanceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeavyMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
