import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareApprovalFormComponent } from './software-approval-form.component';

describe('SoftwareApprovalFormComponent', () => {
  let component: SoftwareApprovalFormComponent;
  let fixture: ComponentFixture<SoftwareApprovalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareApprovalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareApprovalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
