import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantGridItemComponent } from './plant-grid-item.component';

describe('PlantGridItemComponent', () => {
  let component: PlantGridItemComponent;
  let fixture: ComponentFixture<PlantGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantGridItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
