package com.hasan.jobportal2.restController;

import com.hasan.jobportal2.model.JobApplication;
import com.hasan.jobportal2.model.Jobs;
import com.hasan.jobportal2.model.User;
import com.hasan.jobportal2.repository.JobApplicationRepository;
import com.hasan.jobportal2.repository.JobRepository;
import com.hasan.jobportal2.repository.UserRepository;
import com.hasan.jobportal2.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:57162")
@RequestMapping("/api/jobs")
public class JobsController {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final JobService jobsService;

    @Autowired
    public JobsController(UserRepository userRepository, JobRepository jobRepository, JobApplicationRepository jobApplicationRepository, JobService jobsService) {
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.jobApplicationRepository = jobApplicationRepository;
        this.jobsService = jobsService;
    }

    @GetMapping("")
    public List<Jobs> alljobsList() {
        return jobRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Jobs> jobByid(@PathVariable long id) {
        return jobRepository.findById(id);
    }

    @PostMapping("")
    public void saveJobs(@RequestBody Jobs jobs) {
        jobRepository.save(jobs);
    }

    @DeleteMapping("/{id}")
    public void deleteJobById(@PathVariable long id) {
        jobRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void putJobbyid(@PathVariable long id, @RequestBody Jobs jobs) {
        jobs.setId(id);
        jobRepository.save(jobs);
    }

    @GetMapping("/searchjob")
    public ResponseEntity<List<Jobs>> userHomeViewpage(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String category
    ) {
        if (location == null && category == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Jobs> jobsList;
        if (location != null && category != null) {
            jobsList = jobRepository.findByCategoryAndLocation(category, location);
        } else if (location != null) {
            jobsList = jobRepository.findByLocation(location);
        } else {
            jobsList = jobRepository.findByCategory(category);
        }

        return new ResponseEntity<>(jobsList, HttpStatus.OK);
    }

//    @PostMapping("/{jobId}/apply")
//    public ResponseEntity<String> applyForJob(@PathVariable long jobId, @RequestBody User user) {
//        try {
//            jobsService.applyForJob(jobId, user);
//            return ResponseEntity.ok("Job application successful");
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
//        }
//    }



        // Other methods...

    @PostMapping("/{jobId}/apply")
    public ResponseEntity<String> applyForJob(@PathVariable long jobId, @RequestBody Map<String, Integer> requestBody) {
        Integer userId = requestBody.get("userId");

        if (userId != null) {
            try {
                Optional<User> optionalUser = userRepository.findById(userId);
                Optional<Jobs> optionalJob = jobRepository.findById(jobId);

                if (optionalUser.isPresent() && optionalJob.isPresent()) {
                    User user = optionalUser.get();
                    Jobs job = optionalJob.get();

                    // Check if the user has already applied for the job
                    if (!jobsService.hasUserAppliedForJob(jobId, userId)) {
                        JobApplication jobApplication = new JobApplication(user, job);
                        jobApplicationRepository.save(jobApplication);

                        return ResponseEntity.ok("Job application successful");
                    } else {
                        return ResponseEntity.status(HttpStatus.CONFLICT).body("User has already applied for this job");
                    }
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or job not found");
                }
            } catch (RuntimeException e) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User ID is required in the request body");
        }
    }



    // Other methods...

    @GetMapping("/{jobId}/hasApplied")
    public ResponseEntity<Boolean> hasApplied(@PathVariable long jobId, @RequestParam Integer userId) {
        try {
            boolean userHasApplied = jobsService.hasUserAppliedForJob(jobId, userId);
            return ResponseEntity.ok(userHasApplied);
        } catch (RuntimeException e) {
            // Handle the exception based on your requirements
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }



    @GetMapping("/{jobId}/applicants")
    public ResponseEntity<List<User>> getApplicantsForJob(@PathVariable long jobId) {
        Optional<Jobs> optionalJob = jobRepository.findById(jobId);

        if (optionalJob.isPresent()) {
            Jobs job = optionalJob.get();
            List<User> applicants = job.getJobApplications()
                    .stream()
                    .map(JobApplication::getUser)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(applicants, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
// this method work
    @GetMapping("/has_applied_list/{jobId}")
    public ResponseEntity<List<User>> hasAppliedListByJobId(@PathVariable long jobId) {
        boolean exist= jobRepository.findById(jobId).isPresent();
        if (exist){
            Jobs jobs=jobRepository.findById(jobId).get();
            List<User> jobApplicationUserList=userRepository.findUserByJobApplicationsList(jobId);
            System.out.println(jobApplicationUserList);
            System.out.println("inside jobappllicatn");
            return new ResponseEntity<>(jobApplicationUserList, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }



    // optional
    @GetMapping("/job_applicant_list")
    public ResponseEntity<List<JobApplication>> jobApplicantList() {

        List<JobApplication> jobApplicationList=jobApplicationRepository.findAll();
        return ResponseEntity.ok(jobApplicationList);
//        List<JobApplication> jobApplicationList=jobApplicationRepository.findByJobList(jobId);
//        return jobApplicationRepository.findByJobList(jobId);
    }

}
