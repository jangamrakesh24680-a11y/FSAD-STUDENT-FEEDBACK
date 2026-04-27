package com.feedback.backend.controller;

import com.feedback.backend.entity.*;
import com.feedback.backend.payload.request.AnswerRequest;
import com.feedback.backend.payload.request.ResponseSubmitRequest;
import com.feedback.backend.payload.response.MessageResponse;
import com.feedback.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/student")
@PreAuthorize("hasRole('STUDENT')")
public class StudentController {

    @Autowired
    FeedbackFormRepository feedbackFormRepository;

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    ResponseRepository responseRepository;
    
    @Autowired
    AnswerRepository answerRepository;

    @GetMapping("/forms")
    public ResponseEntity<?> getAvailableForms() {
        // Return all forms for simplicity, ideally filtered by enrolled courses
        List<FeedbackForm> forms = feedbackFormRepository.findAll();
        return ResponseEntity.ok(forms);
    }

    @PostMapping("/responses")
    public ResponseEntity<?> submitFeedback(@RequestBody ResponseSubmitRequest request) {
        Optional<FeedbackForm> form = feedbackFormRepository.findById(request.getFormId());
        if (!form.isPresent()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Form not found!"));
        }

        Response response = new Response();
        response.setFeedbackForm(form.get());
        response.setSubmittedAt(LocalDateTime.now());
        
        if (request.getStudentId() != null) {
            Optional<User> student = userRepository.findById(request.getStudentId());
            student.ifPresent(response::setStudent);
        }

        Response savedResponse = responseRepository.save(response);

        if (request.getAnswers() != null) {
            for (AnswerRequest aReq : request.getAnswers()) {
                Optional<Question> question = questionRepository.findById(aReq.getQuestionId());
                if (question.isPresent()) {
                    Answer answer = new Answer();
                    answer.setResponse(savedResponse);
                    answer.setQuestion(question.get());
                    answer.setValueText(aReq.getValueText());
                    answerRepository.save(answer);
                }
            }
        }

        return ResponseEntity.ok(new MessageResponse("Feedback submitted successfully!"));
    }
}
