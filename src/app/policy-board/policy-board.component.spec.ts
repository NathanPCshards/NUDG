import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyBoardComponent } from './policy-board.component';

describe('PolicyBoardComponent', () => {
  let component: PolicyBoardComponent;
  let fixture: ComponentFixture<PolicyBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
