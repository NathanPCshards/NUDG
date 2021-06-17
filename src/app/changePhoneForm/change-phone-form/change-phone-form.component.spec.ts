import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhoneFormComponent } from './change-phone-form.component';

describe('ChangePhoneFormComponent', () => {
  let component: ChangePhoneFormComponent;
  let fixture: ComponentFixture<ChangePhoneFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePhoneFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhoneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
