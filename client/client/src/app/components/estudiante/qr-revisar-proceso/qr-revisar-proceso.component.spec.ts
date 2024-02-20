import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrRevisarProcesoComponent } from './qr-revisar-proceso.component';

describe('QrRevisarProcesoComponent', () => {
  let component: QrRevisarProcesoComponent;
  let fixture: ComponentFixture<QrRevisarProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrRevisarProcesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrRevisarProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
