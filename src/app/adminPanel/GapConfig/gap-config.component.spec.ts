import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GapConfigComponent } from './gap-config.component';

describe('GapConfigComponent', () => {
  let component: GapConfigComponent;
  let fixture: ComponentFixture<GapConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GapConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GapConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
