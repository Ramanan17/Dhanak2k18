import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgansisersComponent } from './organsisers.component';

describe('OrgansisersComponent', () => {
  let component: OrgansisersComponent;
  let fixture: ComponentFixture<OrgansisersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgansisersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgansisersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
