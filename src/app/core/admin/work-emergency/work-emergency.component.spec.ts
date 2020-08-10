import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { WorkEmergencyComponent } from "./work-emergency.component";

describe("WorkEmergencyComponent", () => {
  let component: WorkEmergencyComponent;
  let fixture: ComponentFixture<WorkEmergencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkEmergencyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
