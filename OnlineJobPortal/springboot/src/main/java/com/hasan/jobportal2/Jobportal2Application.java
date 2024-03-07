package com.hasan.jobportal2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


@SpringBootApplication
public class Jobportal2Application {

	public static void main(String[] args) {
		SpringApplication.run(Jobportal2Application.class, args);

//		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//		System.out.println(encoder.encode("1234"));
	}
}
