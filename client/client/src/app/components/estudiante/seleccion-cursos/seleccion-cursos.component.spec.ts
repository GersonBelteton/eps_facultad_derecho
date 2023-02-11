import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionCursosComponent } from './seleccion-cursos.component';

describe('SeleccionCursosComponent', () => {
  let component: SeleccionCursosComponent;
  let fixture: ComponentFixture<SeleccionCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionCursosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
