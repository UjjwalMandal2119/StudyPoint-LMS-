package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.SubmissionStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AssignmentSubmissionResponse {

    private Long id;
    private Long assignmentId;
    private String assignmentTitle;
    private Long studentId;
    private String studentName;
    private String submissionText;
    private String fileUrl;
    private LocalDateTime submittedAt;
    private SubmissionStatus status;
    private Integer marksObtained;
    private String feedback;
    private Long gradedBy;
    private LocalDateTime gradedAt;
    private boolean active;
    private LocalDateTime createdAt;
}