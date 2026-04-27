package com.feedback.backend.payload.request;

public class AnswerRequest {
    private Long questionId;
    private String valueText;

    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }

    public String getValueText() { return valueText; }
    public void setValueText(String valueText) { this.valueText = valueText; }
}
