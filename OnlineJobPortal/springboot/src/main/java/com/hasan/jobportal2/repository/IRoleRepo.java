package com.hasan.jobportal2.repository;

import com.hasan.jobportal2.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleRepo extends JpaRepository<Role,Integer> {
}
