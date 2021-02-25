import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuiContractsFormComponent } from './cui-contracts-form.component';

describe('CuiContractsFormComponent', () => {
  let component: CuiContractsFormComponent;
  let fixture: ComponentFixture<CuiContractsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuiContractsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuiContractsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
