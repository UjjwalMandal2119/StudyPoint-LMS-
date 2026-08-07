package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.AssignmentRequest;
import com.studypoint.backend.dto.response.AssignmentListResponse;
import com.studypoint.backend.dto.response.AssignmentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AssignmentService {

    AssignmentResponse createAssignment(AssignmentRequest assignmentRequest);

    AssignmentResponse updateAssignment(Long id, AssignmentRequest assignmentRequest);

    void deleteAssignment(Long id);

    AssignmentResponse getAssignmentById(Long id);

    Page<AssignmentListResponse> getAllAssignments(Pageable pageable);

    Page<AssignmentListResponse> getAssignmentsByBatchId(Long batchId, Pageable pageable);

    Page<AssignmentListResponse> getAssignmentsBySubjectId(Long subjectId, Pageable pageable);

    AssignmentResponse publishAssignment(Long id);
}