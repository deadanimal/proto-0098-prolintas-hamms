import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrmohonanBaruComponent } from './prmohonan-baru.component';

describe('PrmohonanBaruComponent', () => {
  let component: PrmohonanBaruComponent;
  let fixture: ComponentFixture<PrmohonanBaruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrmohonanBaruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrmohonanBaruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
