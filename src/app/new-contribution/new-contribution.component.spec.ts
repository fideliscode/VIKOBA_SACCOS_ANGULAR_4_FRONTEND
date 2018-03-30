import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContributionComponent } from './new-contribution.component';

describe('NewContributionComponent', () => {
  let component: NewContributionComponent;
  let fixture: ComponentFixture<NewContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
