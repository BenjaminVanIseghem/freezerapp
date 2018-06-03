import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezerListComponent } from './freezer-list.component';

describe('FreezerListComponent', () => {
  let component: FreezerListComponent;
  let fixture: ComponentFixture<FreezerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreezerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreezerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
