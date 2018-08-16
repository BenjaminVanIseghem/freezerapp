import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartmentDetailComponent } from './compartment-detail.component';

describe('CompartmentDetailComponent', () => {
  let component: CompartmentDetailComponent;
  let fixture: ComponentFixture<CompartmentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompartmentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
