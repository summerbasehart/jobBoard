import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantAddComponent } from './contractor-add.component';

describe('ApplicantAddComponent', () => {
  let component: ApplicantAddComponent;
  let fixture: ComponentFixture<ApplicantAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
