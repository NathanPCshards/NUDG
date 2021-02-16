import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifierPageComponent } from './identifier-page.component';

describe('IdentifierPageComponent', () => {
  let component: IdentifierPageComponent;
  let fixture: ComponentFixture<IdentifierPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentifierPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifierPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
