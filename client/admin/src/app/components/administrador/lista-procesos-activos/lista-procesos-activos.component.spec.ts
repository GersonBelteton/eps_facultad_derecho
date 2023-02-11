import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProcesosActivosComponent } from './lista-procesos-activos.component';

describe('ListaProcesosActivosComponent', () => {
  let component: ListaProcesosActivosComponent;
  let fixture: ComponentFixture<ListaProcesosActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProcesosActivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProcesosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
