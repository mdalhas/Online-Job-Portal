package com.hasan.jobportal2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@EqualsAndHashCode(exclude = {"user", "job"})
@Table(name = "job_applications")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "job_id")
    @JsonIgnore
    private Jobs job;


    public JobApplication(User user, Jobs job) {
        this.user = user;
        this.job = job;

        // Establish bidirectional relationship
//        user.getJobApplications().add(this);
        job.getJobApplications().add(this);
    }
}
