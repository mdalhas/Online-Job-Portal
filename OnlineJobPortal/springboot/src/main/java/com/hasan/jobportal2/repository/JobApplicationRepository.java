package com.hasan.jobportal2.repository;

import com.hasan.jobportal2.model.JobApplication;
import com.hasan.jobportal2.model.Jobs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Integer> {
    boolean existsByJob_IdAndUser_Id(long jobId, int id);


    List<JobApplication> findByJobId(Long jobId);
//    @Query(" select j.id, j.job, j.user from JobApplication j where  j.job=?1")
    @Query(" select j from JobApplication j where  j.job.id=?1")
    List<JobApplication> findByJobList(long jobId);
}
