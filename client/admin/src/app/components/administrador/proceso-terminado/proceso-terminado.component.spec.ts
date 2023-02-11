import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoTerminadoComponent } from './proceso-terminado.component';

describe('ProcesoTerminadoComponent', () => {
  let component: ProcesoTerminadoComponent;
  let fixture: ComponentFixture<ProcesoTerminadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoTerminadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoTerminadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
