package com.hasan.jobportal2.repository;

import com.hasan.jobportal2.model.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<FileEntity,Long> {
}
