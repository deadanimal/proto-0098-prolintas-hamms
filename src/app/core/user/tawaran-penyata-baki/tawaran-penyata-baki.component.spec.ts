import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TawaranPenyataBakiComponent } from './tawaran-penyata-baki.component';

describe('TawaranPenyataBakiComponent', () => {
  let component: TawaranPenyataBakiComponent;
  let fixture: ComponentFixture<TawaranPenyataBakiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TawaranPenyataBakiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TawaranPenyataBakiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
