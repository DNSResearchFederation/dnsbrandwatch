import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchDomainsComponent } from './watch-domains.component';

describe('WatchDomainsComponent', () => {
  let component: WatchDomainsComponent;
  let fixture: ComponentFixture<WatchDomainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchDomainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
