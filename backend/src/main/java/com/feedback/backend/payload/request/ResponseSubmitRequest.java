package com.feedback.backend.payload.request;

import java.util.List;

public class ResponseSubmitRequest {
    private Long formId;
    private Long studentId; // Nullable if anonymous
    private List<AnswerRequest> answers;

    public Long getFormId() { return formId; }
    public void setFormId(Long formId) { this.formId = formId; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public List<AnswerRequest> getAnswers() { return answers; }
    public void setAnswers(List<AnswerRequest> answers) { this.answers = answers; }
}
