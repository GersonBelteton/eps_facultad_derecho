import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProcesosNuevosComponent } from './lista-procesos-nuevos.component';

describe('ListaProcesosNuevosComponent', () => {
  let component: ListaProcesosNuevosComponent;
  let fixture: ComponentFixture<ListaProcesosNuevosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProcesosNuevosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProcesosNuevosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
