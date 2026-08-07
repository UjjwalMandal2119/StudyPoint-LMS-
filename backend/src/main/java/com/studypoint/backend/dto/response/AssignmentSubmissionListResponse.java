package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.SubmissionStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AssignmentSubmissionListResponse {

    private Long id;
    private String assignmentTitle;
    private String studentName;
    private LocalDateTime submittedAt;
    private SubmissionStatus status;
    private Integer marksObtained;
}