package com.hasan.jobportal2.repository;

import com.hasan.jobportal2.model.Jobs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository <Jobs, Long> {

    List<Jobs> findByCategoryAndLocation(String category, String location);

    List<Jobs> findByLocation(String location);
    List<Jobs> findByCategory(String category);
}
