import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTetsComponent } from './createtets.component';

describe('CreateTetsComponent', () => {
  let component: CreateTetsComponent;
  let fixture: ComponentFixture<CreateTetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
