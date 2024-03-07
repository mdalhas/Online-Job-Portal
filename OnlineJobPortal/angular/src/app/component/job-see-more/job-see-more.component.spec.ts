import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeeMoreComponent } from './job-see-more.component';

describe('JobSeeMoreComponent', () => {
  let component: JobSeeMoreComponent;
  let fixture: ComponentFixture<JobSeeMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobSeeMoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobSeeMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
