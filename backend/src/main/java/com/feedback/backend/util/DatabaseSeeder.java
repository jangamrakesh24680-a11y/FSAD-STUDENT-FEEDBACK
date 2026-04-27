package com.feedback.backend.util;

import com.feedback.backend.entity.Course;
import com.feedback.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private com.feedback.backend.repository.UserRepository userRepository;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Seed Courses
        if (courseRepository.count() == 0) {
            Course c1 = new Course();
            c1.setName("Introduction to Computer Science (CS101)");
            c1.setInstructorName("Dr. Alan Turing");
            
            Course c2 = new Course();
            c2.setName("Data Structures and Algorithms (CS201)");
            c2.setInstructorName("Dr. Grace Hopper");
            
            Course c3 = new Course();
            c3.setName("Web Development Boot Camp (WEB301)");
            c3.setInstructorName("Dr. Tim Berners-Lee");
            
            courseRepository.save(c1);
            courseRepository.save(c2);
            courseRepository.save(c3);
            
            System.out.println("Seeded database with default courses!");
        }

        // Seed Users
        if (userRepository.count() == 0) {
            com.feedback.backend.entity.User admin = new com.feedback.backend.entity.User();
            admin.setName("Admin User");
            admin.setEmail("admin@feedback.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(com.feedback.backend.entity.Role.ADMIN);
            userRepository.save(admin);

            com.feedback.backend.entity.User student = new com.feedback.backend.entity.User();
            student.setName("Jane Student");
            student.setEmail("student@feedback.com");
            student.setPassword(passwordEncoder.encode("student123"));
            student.setRole(com.feedback.backend.entity.Role.STUDENT);
            userRepository.save(student);

            System.out.println("Seeded database with default users (admin@feedback.com / student@feedback.com)!");
        }
    }
}
