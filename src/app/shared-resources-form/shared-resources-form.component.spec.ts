import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedResourcesFormComponent } from './shared-resources-form.component';

describe('SharedResourcesFormComponent', () => {
  let component: SharedResourcesFormComponent;
  let fixture: ComponentFixture<SharedResourcesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedResourcesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedResourcesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
