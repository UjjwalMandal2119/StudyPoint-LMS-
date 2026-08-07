package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.AssignmentSubmissionRequest;
import com.studypoint.backend.dto.response.AssignmentSubmissionListResponse;
import com.studypoint.backend.dto.response.AssignmentSubmissionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AssignmentSubmissionService {

    AssignmentSubmissionResponse submitAssignment(AssignmentSubmissionRequest assignmentSubmissionRequest);

    AssignmentSubmissionResponse gradeSubmission(Long id, Integer marksObtained, String feedback);

    AssignmentSubmissionResponse getSubmissionById(Long id);

    Page<AssignmentSubmissionResponse> getAllSubmissions(Pageable pageable);

    Page<AssignmentSubmissionResponse> getSubmissionsByAssignmentId(Long assignmentId, Pageable pageable);

    Page<AssignmentSubmissionResponse> getSubmissionsByStudentId(Long studentId, Pageable pageable);
}