package com.studypoint.backend.dto.request;

import com.studypoint.backend.constants.QuestionType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionRequest {

    @NotBlank(message = "Question text is required")
    private String questionText;

    @NotNull(message = "Question type is required")
    private QuestionType questionType;

    @NotNull(message = "Subject ID is required")
    private Long subjectId;

    private String options;

    private String correctAnswer;

    private String explanation;

    @NotNull(message = "Marks is required")
    @Min(value = 1, message = "Marks must be at least 1")
    private int marks;

    private String difficultyLevel;
}