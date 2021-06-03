import { ComponentFixture, TestBed } from '@angular/core/testing';

import { POAMComponent } from './poam.component';

describe('POAMComponent', () => {
  let component: POAMComponent;
  let fixture: ComponentFixture<POAMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ POAMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(POAMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
