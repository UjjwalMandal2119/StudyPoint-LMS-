package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.QuestionType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionListResponse {

    private Long id;
    private String questionText;
    private QuestionType questionType;
    private String subjectName;
    private int marks;
    private String difficultyLevel;
    private boolean approved;
}