import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezerDetailComponent } from './freezer-detail.component';

describe('FreezerDetailComponent', () => {
  let component: FreezerDetailComponent;
  let fixture: ComponentFixture<FreezerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreezerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreezerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
