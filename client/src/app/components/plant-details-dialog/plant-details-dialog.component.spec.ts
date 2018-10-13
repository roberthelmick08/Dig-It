import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantDetailsDialogComponent } from './plant-details-dialog.component';

describe('PlantDetailsDialogComponent', () => {
  let component: PlantDetailsDialogComponent;
  let fixture: ComponentFixture<PlantDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
