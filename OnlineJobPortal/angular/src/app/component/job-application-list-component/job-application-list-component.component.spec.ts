import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationListComponentComponent } from './job-application-list-component.component';

describe('JobApplicationListComponentComponent', () => {
  let component: JobApplicationListComponentComponent;
  let fixture: ComponentFixture<JobApplicationListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobApplicationListComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobApplicationListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
