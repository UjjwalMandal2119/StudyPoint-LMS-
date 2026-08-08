package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.ParentRequest;
import com.studypoint.backend.dto.response.ParentResponse;
import com.studypoint.backend.service.ParentService;
import com.studypoint.backend.dto.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/parents")
@RequiredArgsConstructor
public class ParentController {
    private final ParentService parentService;

    @PostMapping
    public ResponseEntity<ApiResponse<ParentResponse>> createParent(@Valid @RequestBody ParentRequest request) {
        ParentResponse response = parentService.createParent(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response, "Parent created successfully", HttpStatus.CREATED.value()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ParentResponse>> updateParent(@PathVariable Long id, @Valid @RequestBody ParentRequest request) {
        ParentResponse response = parentService.updateParent(id, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Parent updated successfully", HttpStatus.OK.value()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteParent(@PathVariable Long id) {
        parentService.deleteParent(id);
        return ResponseEntity.ok(ApiResponse.success("Parent deleted successfully", HttpStatus.OK.value()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ParentResponse>>> getAllParents(Pageable pageable) {
        Page<ParentResponse> parents = parentService.getAllParents(pageable);
        return ResponseEntity.ok(ApiResponse.success(parents, HttpStatus.OK.value()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ParentResponse>> getParentById(@PathVariable Long id) {
        ParentResponse response = parentService.getParentById(id);
        return ResponseEntity.ok(ApiResponse.success(response, HttpStatus.OK.value()));
    }
}

