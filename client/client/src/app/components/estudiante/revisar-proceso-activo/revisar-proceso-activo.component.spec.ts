import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarProcesoActivoComponent } from './revisar-proceso-activo.component';

describe('RevisarProcesoActivoComponent', () => {
  let component: RevisarProcesoActivoComponent;
  let fixture: ComponentFixture<RevisarProcesoActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisarProcesoActivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarProcesoActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
