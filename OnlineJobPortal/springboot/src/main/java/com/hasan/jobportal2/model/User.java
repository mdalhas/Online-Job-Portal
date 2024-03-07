package com.hasan.jobportal2.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(exclude = "jobApplications")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column( nullable = false)
    private String name;

    @Column(unique = true, nullable = false) // Ensure email is unique and not null
    private String email;
    @Column( nullable = false)
    private String password;
    private String qualification;

    private String cellNo;

    private String gender;

    private Date dob;
    private String image;

    private String cvFileName;
    private String cvContentType;
    @Lob
    @Column(name = "cvfile", columnDefinition = "LONGBLOB")
    private byte[] cvFile;

    private  boolean isEnable;

@Column( nullable = false)
    private String role;

    @OneToOne(mappedBy = "user",fetch =FetchType.EAGER, cascade = CascadeType.ALL)
    private FileEntity fileEntity;

    public User(String email, String password) {
        this.email = email;
        this.password = password;

    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, email, password, qualification, cellNo, gender, dob, image, isEnable, role);
    }



}
