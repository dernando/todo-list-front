import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTaskFormComponent } from './no-task-form.component';

describe('NoTaskFormComponent', () => {
  let component: NoTaskFormComponent;
  let fixture: ComponentFixture<NoTaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoTaskFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
