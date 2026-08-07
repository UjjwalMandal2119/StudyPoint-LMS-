package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.BulkQuestionRequest;
import com.studypoint.backend.dto.request.QuestionRequest;
import com.studypoint.backend.dto.response.QuestionListResponse;
import com.studypoint.backend.dto.response.QuestionResponse;
import com.studypoint.backend.response.ApiResponse;
import com.studypoint.backend.service.QuestionService;
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

import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<ApiResponse<QuestionResponse>> createQuestion(@Valid @RequestBody QuestionRequest questionRequest) {
        QuestionResponse questionResponse = questionService.createQuestion(questionRequest);
        return ResponseEntity.ok(ApiResponse.success(questionResponse, "Question created successfully", 200));
    }

    @PostMapping("/bulk")
    public ResponseEntity<ApiResponse<List<QuestionResponse>>> createBulkQuestions(@Valid @RequestBody BulkQuestionRequest bulkQuestionRequest) {
        List<QuestionResponse> questionResponses = questionService.createBulkQuestions(bulkQuestionRequest);
        return ResponseEntity.ok(ApiResponse.success(questionResponses, "Questions created successfully", 200));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<QuestionResponse>> updateQuestion(@PathVariable Long id, @Valid @RequestBody QuestionRequest questionRequest) {
        QuestionResponse questionResponse = questionService.updateQuestion(id, questionRequest);
        return ResponseEntity.ok(ApiResponse.success(questionResponse, "Question updated successfully", 200));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok(ApiResponse.success("Question deleted successfully", 200));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<QuestionResponse>>> getAllQuestions(Pageable pageable) {
        Page<QuestionResponse> questions = questionService.getAllQuestions(pageable);
        return ResponseEntity.ok(ApiResponse.success(questions, "Questions retrieved successfully", 200));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<QuestionResponse>> getQuestionById(@PathVariable Long id) {
        QuestionResponse questionResponse = questionService.getQuestionById(id);
        return ResponseEntity.ok(ApiResponse.success(questionResponse, "Question retrieved successfully", 200));
    }

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<ApiResponse<Page<QuestionResponse>>> getQuestionsBySubjectId(@PathVariable Long subjectId, Pageable pageable) {
        Page<QuestionResponse> questions = questionService.getQuestionsBySubjectId(subjectId, pageable);
        return ResponseEntity.ok(ApiResponse.success(questions, "Questions retrieved successfully", 200));
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<ApiResponse<QuestionResponse>> approveQuestion(@PathVariable Long id) {
        QuestionResponse questionResponse = questionService.approveQuestion(id);
        return ResponseEntity.ok(ApiResponse.success(questionResponse, "Question approved successfully", 200));
    }

    @GetMapping("/subject/{subjectId}/approved")
    public ResponseEntity<ApiResponse<Page<QuestionResponse>>> getApprovedQuestionsBySubjectId(@PathVariable Long subjectId, Pageable pageable) {
        Page<QuestionResponse> questions = questionService.getApprovedQuestionsBySubjectId(subjectId, pageable);
        return ResponseEntity.ok(ApiResponse.success(questions, "Approved questions retrieved successfully", 200));
    }
}