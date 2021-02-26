import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GapAssessmentPageComponent } from './gap-assessment-page.component';

describe('GapAssessmentPageComponent', () => {
  let component: GapAssessmentPageComponent;
  let fixture: ComponentFixture<GapAssessmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GapAssessmentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GapAssessmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
