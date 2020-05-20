import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcductFilterComponent } from './procduct-filter.component';

describe('ProcductFilterComponent', () => {
  let component: ProcductFilterComponent;
  let fixture: ComponentFixture<ProcductFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcductFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcductFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
