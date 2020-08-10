import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenaraiPemohonComponent } from './senarai-pemohon.component';

describe('SenaraiPemohonComponent', () => {
  let component: SenaraiPemohonComponent;
  let fixture: ComponentFixture<SenaraiPemohonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenaraiPemohonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenaraiPemohonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
