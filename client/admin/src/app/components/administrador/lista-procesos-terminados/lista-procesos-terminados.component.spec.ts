import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProcesosTerminadosComponent } from './lista-procesos-terminados.component';

describe('ListaProcesosTerminadosComponent', () => {
  let component: ListaProcesosTerminadosComponent;
  let fixture: ComponentFixture<ListaProcesosTerminadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProcesosTerminadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProcesosTerminadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
