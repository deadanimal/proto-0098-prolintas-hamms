import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAuditComponent } from './management-audit.component';

describe('ManagementAuditComponent', () => {
  let component: ManagementAuditComponent;
  let fixture: ComponentFixture<ManagementAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
