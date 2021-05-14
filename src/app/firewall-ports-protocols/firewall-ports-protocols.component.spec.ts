import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirewallPortsProtocolsComponent } from './firewall-ports-protocols.component';

describe('FirewallPortsProtocolsComponent', () => {
  let component: FirewallPortsProtocolsComponent;
  let fixture: ComponentFixture<FirewallPortsProtocolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirewallPortsProtocolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirewallPortsProtocolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
