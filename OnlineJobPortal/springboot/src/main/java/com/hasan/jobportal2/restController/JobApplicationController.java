package com.hasan.jobportal2.restController;
import com.hasan.jobportal2.model.JobApplication;
import com.hasan.jobportal2.repository.JobApplicationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:57162")
@RequestMapping("/api/employer")
public class JobApplicationController {
    JobApplicationRepository jobApplicationRepository;

    public JobApplicationController(JobApplicationRepository jobApplicationRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<JobApplication>> getApplicantsForJob(@PathVariable Long jobId) {
        // Use the repository to find job applications for the specified job ID
        List<JobApplication> applicants = jobApplicationRepository.findByJobId(jobId);
      System.out.println(applicants);
        return new ResponseEntity<>(applicants, HttpStatus.OK);
    }
}
