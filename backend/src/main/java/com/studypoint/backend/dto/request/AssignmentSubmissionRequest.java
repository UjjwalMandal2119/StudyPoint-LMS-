package com.studypoint.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignmentSubmissionRequest {

    @NotNull(message = "Assignment ID is required")
    private Long assignmentId;

    private String submissionText;

    private String fileUrl;
}