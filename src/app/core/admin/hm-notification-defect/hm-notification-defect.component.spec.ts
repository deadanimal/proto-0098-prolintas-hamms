import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmNotificationDefectComponent } from './hm-notification-defect.component';

describe('HmNotificationDefectComponent', () => {
  let component: HmNotificationDefectComponent;
  let fixture: ComponentFixture<HmNotificationDefectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmNotificationDefectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmNotificationDefectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
