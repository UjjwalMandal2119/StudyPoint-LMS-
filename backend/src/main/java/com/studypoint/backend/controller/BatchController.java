package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.BatchRequest;
import com.studypoint.backend.dto.response.BatchListResponse;
import com.studypoint.backend.dto.response.BatchResponse;
import com.studypoint.backend.response.ApiResponse;
import com.studypoint.backend.service.BatchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/batches")
@RequiredArgsConstructor
public class BatchController {

    private final BatchService batchService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<BatchResponse> createBatch(@Valid @RequestBody BatchRequest request) {
        BatchResponse response = batchService.createBatch(request);
        return ApiResponse.success(response, "Batch created successfully", HttpStatus.CREATED.value());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<BatchResponse> updateBatch(@PathVariable Long id, @Valid @RequestBody BatchRequest request) {
        BatchResponse response = batchService.updateBatch(id, request);
        return ApiResponse.success(response, "Batch updated successfully", HttpStatus.OK.value());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<String> deleteBatch(@PathVariable Long id) {
        batchService.deleteBatch(id);
        return ApiResponse.success("Batch deleted successfully", HttpStatus.OK.value());
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<Page<BatchListResponse>> getAllBatches(Pageable pageable) {
        Page<BatchListResponse> batches = batchService.getAllBatches(pageable);
        return ApiResponse.success(batches, HttpStatus.OK.value());
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<BatchResponse> getBatchById(@PathVariable Long id) {
        BatchResponse batch = batchService.getBatchById(id);
        return ApiResponse.success(batch, HttpStatus.OK.value());
    }

    @GetMapping("/course/{courseId}")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<List<BatchListResponse>> getBatchesByCourseId(@PathVariable Long courseId) {
        List<BatchListResponse> batches = batchService.getBatchesByCourseId(courseId);
        return ApiResponse.success(batches, HttpStatus.OK.value());
    }

    @GetMapping("/teacher/{teacherId}")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<List<BatchListResponse>> getBatchesByTeacherId(@PathVariable Long teacherId) {
        List<BatchListResponse> batches = batchService.getBatchesByTeacherId(teacherId);
        return ApiResponse.success(batches, HttpStatus.OK.value());
    }

    @PatchMapping("/{id}/toggle-active")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<BatchResponse> toggleActive(@PathVariable Long id) {
        BatchResponse batch = batchService.toggleActive(id);
        return ApiResponse.success(batch, "Batch status toggled successfully", HttpStatus.OK.value());
    }
}