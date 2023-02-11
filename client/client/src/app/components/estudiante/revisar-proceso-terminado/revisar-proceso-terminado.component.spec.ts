import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarProcesoTerminadoComponent } from './revisar-proceso-terminado.component';

describe('RevisarProcesoTerminadoComponent', () => {
  let component: RevisarProcesoTerminadoComponent;
  let fixture: ComponentFixture<RevisarProcesoTerminadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisarProcesoTerminadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarProcesoTerminadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
