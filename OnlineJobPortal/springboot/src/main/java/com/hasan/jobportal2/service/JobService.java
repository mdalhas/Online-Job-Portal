package com.hasan.jobportal2.service;

import com.hasan.jobportal2.model.JobApplication;
import com.hasan.jobportal2.model.Jobs;
import com.hasan.jobportal2.model.User;
import com.hasan.jobportal2.repository.JobApplicationRepository;
import com.hasan.jobportal2.repository.JobRepository;
import com.hasan.jobportal2.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final JobApplicationRepository jobApplicationRepository;

    @Autowired
    public JobService(JobRepository jobRepository, UserRepository userRepository, JobApplicationRepository jobApplicationRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.jobApplicationRepository = jobApplicationRepository;
    }

    @Transactional
    public void applyForJob(long jobId, Integer userId) {
        Jobs job = getJobOrThrowException(jobId);
        User user = getUserOrThrowException(userId);

        if (hasUserAppliedForJob(job, user)) {
            throw new RuntimeException("User has already applied for this job");
        }

        JobApplication jobApplication = new JobApplication(user, job);
        jobApplicationRepository.save(jobApplication);
    }

    public boolean hasUserAppliedForJob(long jobId, Integer userId) {
        Jobs job = getJobOrThrowException(jobId);
        User user = getUserOrThrowException(userId);

        return hasUserAppliedForJob(job, user);
    }

    private boolean hasUserAppliedForJob(Jobs job, User user) {
        return job.getJobApplications().stream()
                .anyMatch(application -> application.getUser().equals(user));
    }

    private Jobs getJobOrThrowException(long jobId) {
        return jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    private User getUserOrThrowException(Integer userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


    public boolean hasUserAppliedForJob(long jobId, long userId) {
        Optional<Jobs> optionalJob = jobRepository.findById(jobId);
        Optional<User> optionalUser = userRepository.findById((int) userId);

        if (optionalJob.isPresent() && optionalUser.isPresent()) {
            Jobs job = optionalJob.get();
            User user = optionalUser.get();

            return job.getJobApplications().stream()
                    .anyMatch(application -> application.getUser().equals(user));
        } else {
            // Job or user not found
            throw new RuntimeException("Job or user not found");
        }
    }
}
