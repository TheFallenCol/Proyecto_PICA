import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationCardComponentComponent } from './information-card-component.component';

describe('InformationCardComponentComponent', () => {
  let component: InformationCardComponentComponent;
  let fixture: ComponentFixture<InformationCardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationCardComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
