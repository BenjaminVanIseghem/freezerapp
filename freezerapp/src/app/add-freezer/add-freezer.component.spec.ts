import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFreezerComponent } from './add-freezer.component';

describe('AddFreezerComponent', () => {
  let component: AddFreezerComponent;
  let fixture: ComponentFixture<AddFreezerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFreezerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFreezerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
