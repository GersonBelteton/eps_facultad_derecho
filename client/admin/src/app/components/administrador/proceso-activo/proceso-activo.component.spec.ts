import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoActivoComponent } from './proceso-activo.component';

describe('ProcesoActivoComponent', () => {
  let component: ProcesoActivoComponent;
  let fixture: ComponentFixture<ProcesoActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoActivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
