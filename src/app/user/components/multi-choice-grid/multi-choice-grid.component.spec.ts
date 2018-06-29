import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiChoiceGridComponent } from './multi-choice-grid.component';

describe('MultiChoiceGridComponent', () => {
  let component: MultiChoiceGridComponent;
  let fixture: ComponentFixture<MultiChoiceGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiChoiceGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiChoiceGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
