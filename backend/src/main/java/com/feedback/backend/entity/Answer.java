package com.feedback.backend.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "answers")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "response_id", nullable = false)
    @JsonIgnore
    private Response response;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    // Store all values as text:
    // Rating -> "5"
    // MCQ -> "Option A"
    // Text -> "Great course!"
    @Column(nullable = false, length = 1000)
    private String valueText;

    public Answer() {}

    public Answer(Long id, Response response, Question question, String valueText) {
        this.id = id;
        this.response = response;
        this.question = question;
        this.valueText = valueText;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Response getResponse() { return response; }
    public void setResponse(Response response) { this.response = response; }

    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }

    public String getValueText() { return valueText; }
    public void setValueText(String valueText) { this.valueText = valueText; }
}
