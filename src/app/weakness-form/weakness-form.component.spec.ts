import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaknessFormComponent } from './weakness-form.component';

describe('WeaknessFormComponent', () => {
  let component: WeaknessFormComponent;
  let fixture: ComponentFixture<WeaknessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaknessFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaknessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
