import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TawaranUrusanBakiComponent } from './tawaran-urusan-baki.component';

describe('TawaranUrusanBakiComponent', () => {
  let component: TawaranUrusanBakiComponent;
  let fixture: ComponentFixture<TawaranUrusanBakiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TawaranUrusanBakiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TawaranUrusanBakiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
