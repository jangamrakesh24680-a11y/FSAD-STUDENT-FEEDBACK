package com.feedback.backend.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionType type;

    // For MCQ, store options as comma-separated string
    private String options;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "form_id", nullable = false)
    @JsonIgnore
    private FeedbackForm feedbackForm;

    public Question() {}

    public Question(Long id, String content, QuestionType type, String options, FeedbackForm feedbackForm) {
        this.id = id;
        this.content = content;
        this.type = type;
        this.options = options;
        this.feedbackForm = feedbackForm;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public QuestionType getType() { return type; }
    public void setType(QuestionType type) { this.type = type; }

    public String getOptions() { return options; }
    public void setOptions(String options) { this.options = options; }

    public FeedbackForm getFeedbackForm() { return feedbackForm; }
    public void setFeedbackForm(FeedbackForm feedbackForm) { this.feedbackForm = feedbackForm; }
}
