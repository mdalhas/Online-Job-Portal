package com.hasan.jobportal2.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Jobs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String description;
    private String category;
    private String status;
    private String location;

    private Date deadlinedate;


    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "pdate", nullable = false, updatable = false)
    private Date pdate;

    @PrePersist
    protected void onCreate() {
        pdate = new Date();
    }


   @OneToMany (mappedBy = "job" ,fetch =FetchType.EAGER, cascade = CascadeType.ALL,orphanRemoval = true)
    private Set <JobApplication> jobApplications= new HashSet<>();

}
