package com.hasan.jobportal2.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration

public class FormLoginSecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.authorizeRequests().requestMatchers("/**").hasRole("USER").and().formLogin()
//                .usernameParameter("username") // default is username
//                .passwordParameter("password") // default is password
//                .loginPage("/authentication/login") // default is /login with an HTTP get
//                .failureUrl("/authentication/login?failed") // default is /login?error
//                .loginProcessingUrl("/authentication/login/process"); // default is /login
//        // with an HTTP
//        // post
//        return http.build();
//    }
//
//    @Bean
//    public UserDetailsService userDetailsService() {
//        UserDetails user = User.withDefaultPasswordEncoder()
//                .username("user")
//                .password("password")
//                .roles("USER")
//                .build();
//        return new InMemoryUserDetailsManager(user);
//    }
}