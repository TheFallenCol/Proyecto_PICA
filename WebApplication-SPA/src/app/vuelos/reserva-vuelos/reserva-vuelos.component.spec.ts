import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaVuelosComponent } from './reserva-vuelos.component';

describe('ReservaVuelosComponent', () => {
  let component: ReservaVuelosComponent;
  let fixture: ComponentFixture<ReservaVuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaVuelosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
