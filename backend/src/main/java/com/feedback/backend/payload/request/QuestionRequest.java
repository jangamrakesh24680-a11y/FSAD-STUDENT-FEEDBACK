package com.feedback.backend.payload.request;

import com.feedback.backend.entity.QuestionType;

public class QuestionRequest {
    private String content;
    private QuestionType type;
    private String options;

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public QuestionType getType() { return type; }
    public void setType(QuestionType type) { this.type = type; }

    public String getOptions() { return options; }
    public void setOptions(String options) { this.options = options; }
}
