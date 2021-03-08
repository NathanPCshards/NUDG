import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityLogFormComponent } from './security-log-form.component';

describe('SecurityLogFormComponent', () => {
  let component: SecurityLogFormComponent;
  let fixture: ComponentFixture<SecurityLogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityLogFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
