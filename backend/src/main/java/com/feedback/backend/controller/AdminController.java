package com.feedback.backend.controller;

import com.feedback.backend.entity.*;
import com.feedback.backend.payload.request.FeedbackFormRequest;
import com.feedback.backend.payload.request.QuestionRequest;
import com.feedback.backend.payload.response.MessageResponse;
import com.feedback.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    FeedbackFormRepository feedbackFormRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    ResponseRepository responseRepository;

    @GetMapping("/courses")
    public ResponseEntity<?> getAllCourses() {
        logger.info("Fetching all courses");
        return ResponseEntity.ok(courseRepository.findAll());
    }

    @PostMapping("/courses")
    public ResponseEntity<?> addCourse(@RequestBody Course course) {
        courseRepository.save(course);
        return ResponseEntity.ok(new MessageResponse("Course added successfully!"));
    }

    @PostMapping("/forms")
    public ResponseEntity<?> createForm(@RequestBody FeedbackFormRequest request) {
        Optional<Course> course = courseRepository.findById(request.getCourseId());
        if (!course.isPresent()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Course not found!"));
        }

        FeedbackForm form = new FeedbackForm();
        form.setTitle(request.getTitle());
        form.setCourse(course.get());
        form.setDeadline(request.getDeadline());
        
        FeedbackForm savedForm = feedbackFormRepository.save(form);

        if (request.getQuestions() != null) {
            for (QuestionRequest qReq : request.getQuestions()) {
                Question q = new Question();
                q.setContent(qReq.getContent());
                q.setType(qReq.getType());
                q.setOptions(qReq.getOptions());
                q.setFeedbackForm(savedForm);
                questionRepository.save(q);
            }
        }

        return ResponseEntity.ok(new MessageResponse("Form created successfully!"));
    }

    @GetMapping("/forms")
    public ResponseEntity<?> getAllForms() {
        logger.info("Fetching all feedback forms");
        return ResponseEntity.ok(feedbackFormRepository.findAll());
    }

    @GetMapping("/forms/{id}/responses")
    public ResponseEntity<?> getFormResponses(@PathVariable Long id) {
        List<Response> responses = responseRepository.findByFeedbackFormId(id);
        return ResponseEntity.ok(responses);
    }
    
    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalyticsOverview() {
        logger.info("Fetching analytics overview");
        // Mock overview, in a real app would be complex aggregation queries
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalResponses", responseRepository.count());
        analytics.put("totalForms", feedbackFormRepository.count());
        analytics.put("totalCourses", courseRepository.count());
        return ResponseEntity.ok(analytics);
    }
}
