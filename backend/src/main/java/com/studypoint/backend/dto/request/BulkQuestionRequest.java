package com.studypoint.backend.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BulkQuestionRequest {

    @NotEmpty(message = "Questions list cannot be empty")
    @Valid
    private List<QuestionRequest> questions;
}