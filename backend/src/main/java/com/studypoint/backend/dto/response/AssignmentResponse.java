package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.AssignmentStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AssignmentResponse {

    private Long id;
    private String title;
    private String description;
    private Long batchId;
    private String batchName;
    private Long subjectId;
    private String subjectName;
    private Long teacherId;
    private String teacherName;
    private LocalDateTime dueDate;
    private int totalMarks;
    private String fileUrl;
    private AssignmentStatus status;
    private boolean lateSubmissionAllowed;
    private boolean active;
    private LocalDateTime createdAt;
}