import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { KpiModuleComponent } from "./kpi-module.component";

describe("KpiModuleComponent", () => {
  let component: KpiModuleComponent;
  let fixture: ComponentFixture<KpiModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KpiModuleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
