import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaMonitoringComponent } from './media-monitoring.component';

describe('MediaMonitoringComponent', () => {
  let component: MediaMonitoringComponent;
  let fixture: ComponentFixture<MediaMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
