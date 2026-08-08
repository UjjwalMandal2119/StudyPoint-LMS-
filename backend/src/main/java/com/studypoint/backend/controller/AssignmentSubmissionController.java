package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.AssignmentSubmissionRequest;
import com.studypoint.backend.dto.response.AssignmentSubmissionListResponse;
import com.studypoint.backend.dto.response.AssignmentSubmissionResponse;
import com.studypoint.backend.dto.response.ApiResponse;
import com.studypoint.backend.service.AssignmentSubmissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/assignment-submissions")
@RequiredArgsConstructor
public class AssignmentSubmissionController {

    private final AssignmentSubmissionService assignmentSubmissionService;

    @PostMapping("/submit")
    public ResponseEntity<ApiResponse<AssignmentSubmissionResponse>> submitAssignment(@Valid @RequestBody AssignmentSubmissionRequest assignmentSubmissionRequest) {
        AssignmentSubmissionResponse submissionResponse = assignmentSubmissionService.submitAssignment(assignmentSubmissionRequest);
        return ResponseEntity.ok(ApiResponse.success(submissionResponse, "Assignment submitted successfully", 200));
    }

    @PutMapping("/{id}/grade")
    public ResponseEntity<ApiResponse<AssignmentSubmissionResponse>> gradeSubmission(@PathVariable Long id, @RequestParam Integer marksObtained, @RequestParam String feedback) {
        AssignmentSubmissionResponse submissionResponse = assignmentSubmissionService.gradeSubmission(id, marksObtained, feedback);
        return ResponseEntity.ok(ApiResponse.success(submissionResponse, "Submission graded successfully", 200));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<AssignmentSubmissionResponse>>> getAllSubmissions(Pageable pageable) {
        Page<AssignmentSubmissionResponse> submissions = assignmentSubmissionService.getAllSubmissions(pageable);
        return ResponseEntity.ok(ApiResponse.success(submissions, "Submissions retrieved successfully", 200));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AssignmentSubmissionResponse>> getSubmissionById(@PathVariable Long id) {
        AssignmentSubmissionResponse submissionResponse = assignmentSubmissionService.getSubmissionById(id);
        return ResponseEntity.ok(ApiResponse.success(submissionResponse, "Submission retrieved successfully", 200));
    }

    @GetMapping("/assignment/{assignmentId}")
    public ResponseEntity<ApiResponse<Page<AssignmentSubmissionResponse>>> getSubmissionsByAssignmentId(@PathVariable Long assignmentId, Pageable pageable) {
        Page<AssignmentSubmissionResponse> submissions = assignmentSubmissionService.getSubmissionsByAssignmentId(assignmentId, pageable);
        return ResponseEntity.ok(ApiResponse.success(submissions, "Submissions retrieved successfully", 200));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<Page<AssignmentSubmissionResponse>>> getSubmissionsByStudentId(@PathVariable Long studentId, Pageable pageable) {
        Page<AssignmentSubmissionResponse> submissions = assignmentSubmissionService.getSubmissionsByStudentId(studentId, pageable);
        return ResponseEntity.ok(ApiResponse.success(submissions, "Submissions retrieved successfully", 200));
    }
}
