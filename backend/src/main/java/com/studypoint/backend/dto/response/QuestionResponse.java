package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.QuestionType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class QuestionResponse {

    private Long id;
    private String questionText;
    private QuestionType questionType;
    private Long subjectId;
    private String subjectName;
    private String options;
    private String correctAnswer;
    private String explanation;
    private int marks;
    private String difficultyLevel;
    private Long createdBy;
    private boolean approved;
    private boolean active;
    private LocalDateTime createdAt;
}