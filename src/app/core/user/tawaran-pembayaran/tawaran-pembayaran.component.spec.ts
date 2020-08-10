import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TawaranPembayaranComponent } from './tawaran-pembayaran.component';

describe('TawaranPembayaranComponent', () => {
  let component: TawaranPembayaranComponent;
  let fixture: ComponentFixture<TawaranPembayaranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TawaranPembayaranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TawaranPembayaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
