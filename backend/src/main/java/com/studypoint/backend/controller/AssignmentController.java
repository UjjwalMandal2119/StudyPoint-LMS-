package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.AssignmentRequest;
import com.studypoint.backend.dto.response.AssignmentListResponse;
import com.studypoint.backend.dto.response.AssignmentResponse;
import com.studypoint.backend.response.ApiResponse;
import com.studypoint.backend.service.AssignmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService assignmentService;

    @PostMapping
    public ResponseEntity<ApiResponse<AssignmentResponse>> createAssignment(@Valid @RequestBody AssignmentRequest assignmentRequest) {
        AssignmentResponse assignmentResponse = assignmentService.createAssignment(assignmentRequest);
        return ResponseEntity.ok(ApiResponse.success(assignmentResponse, "Assignment created successfully", 200));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AssignmentResponse>> updateAssignment(@PathVariable Long id, @Valid @RequestBody AssignmentRequest assignmentRequest) {
        AssignmentResponse assignmentResponse = assignmentService.updateAssignment(id, assignmentRequest);
        return ResponseEntity.ok(ApiResponse.success(assignmentResponse, "Assignment updated successfully", 200));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAssignment(@PathVariable Long id) {
        assignmentService.deleteAssignment(id);
        return ResponseEntity.ok(ApiResponse.success("Assignment deleted successfully", 200));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<AssignmentListResponse>>> getAllAssignments(Pageable pageable) {
        Page<AssignmentListResponse> assignments = assignmentService.getAllAssignments(pageable);
        return ResponseEntity.ok(ApiResponse.success(assignments, "Assignments retrieved successfully", 200));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AssignmentResponse>> getAssignmentById(@PathVariable Long id) {
        AssignmentResponse assignmentResponse = assignmentService.getAssignmentById(id);
        return ResponseEntity.ok(ApiResponse.success(assignmentResponse, "Assignment retrieved successfully", 200));
    }

    @GetMapping("/batch/{batchId}")
    public ResponseEntity<ApiResponse<Page<AssignmentListResponse>>> getAssignmentsByBatchId(@PathVariable Long batchId, Pageable pageable) {
        Page<AssignmentListResponse> assignments = assignmentService.getAssignmentsByBatchId(batchId, pageable);
        return ResponseEntity.ok(ApiResponse.success(assignments, "Assignments retrieved successfully", 200));
    }

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<ApiResponse<Page<AssignmentListResponse>>> getAssignmentsBySubjectId(@PathVariable Long subjectId, Pageable pageable) {
        Page<AssignmentListResponse> assignments = assignmentService.getAssignmentsBySubjectId(subjectId, pageable);
        return ResponseEntity.ok(ApiResponse.success(assignments, "Assignments retrieved successfully", 200));
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<ApiResponse<AssignmentResponse>> publishAssignment(@PathVariable Long id) {
        AssignmentResponse assignmentResponse = assignmentService.publishAssignment(id);
        return ResponseEntity.ok(ApiResponse.success(assignmentResponse, "Assignment published successfully", 200));
    }
}