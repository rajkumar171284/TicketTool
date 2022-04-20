import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavFixedComponent } from './sidenav-fixed.component';

describe('SidenavFixedComponent', () => {
  let component: SidenavFixedComponent;
  let fixture: ComponentFixture<SidenavFixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavFixedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
