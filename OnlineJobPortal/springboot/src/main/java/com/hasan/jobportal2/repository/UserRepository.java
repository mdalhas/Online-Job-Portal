package com.hasan.jobportal2.repository;

import com.hasan.jobportal2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {


    User  findUserByEmail( String email);
    User  findByEmail(@Param("email") String email);
    @Query("select count(u.id)  from User u")
    Integer findByCount();

    User findByEmailAndPassword(String email, String password);
    @Query("select u from User u inner join JobApplication j on u.id = j.user.id where j.job.id = ?1")
    List<User> findUserByJobApplicationsList( long id);
}
