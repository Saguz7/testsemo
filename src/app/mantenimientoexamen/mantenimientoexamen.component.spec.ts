import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoexamenComponent } from './mantenimientoexamen.component';

describe('MantenimientoexamenComponent', () => {
  let component: MantenimientoexamenComponent;
  let fixture: ComponentFixture<MantenimientoexamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoexamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoexamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
