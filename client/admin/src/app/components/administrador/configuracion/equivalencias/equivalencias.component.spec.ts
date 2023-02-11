import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquivalenciasComponent } from './equivalencias.component';

describe('EquivalenciasComponent', () => {
  let component: EquivalenciasComponent;
  let fixture: ComponentFixture<EquivalenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquivalenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquivalenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
