import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkSharesFormComponent } from './network-shares-form.component';

describe('NetworkSharesFormComponent', () => {
  let component: NetworkSharesFormComponent;
  let fixture: ComponentFixture<NetworkSharesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkSharesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkSharesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
