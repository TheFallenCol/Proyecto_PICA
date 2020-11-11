import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaVuelosComponent } from './consulta-vuelos.component';

describe('ConsultaVuelosComponent', () => {
  let component: ConsultaVuelosComponent;
  let fixture: ComponentFixture<ConsultaVuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaVuelosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
