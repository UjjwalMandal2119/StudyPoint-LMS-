package com.studypoint.backend.controller;

import com.studypoint.backend.constants.EnrollmentStatus;
import com.studypoint.backend.dto.request.AdmissionRequest;
import com.studypoint.backend.dto.response.AdmissionListResponse;
import com.studypoint.backend.dto.response.AdmissionResponse;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.dto.response.ApiResponse;
import com.studypoint.backend.service.AdmissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admissions")
@RequiredArgsConstructor
public class AdmissionController {

    private final AdmissionService admissionService;
    private final UserRepository userRepository;

    @PostMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<ApiResponse<AdmissionResponse>> createApplication(@Valid @RequestBody AdmissionRequest request) {
        AdmissionResponse response = admissionService.createApplication(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, "Admission application submitted successfully", HttpStatus.CREATED.value()));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('RECEPTIONIST')")
    public ResponseEntity<ApiResponse<Page<AdmissionListResponse>>> getAllApplications(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(admissionService.getAllApplications(pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('RECEPTIONIST')")
    public ResponseEntity<ApiResponse<Page<AdmissionListResponse>>> getByStatus(@PathVariable EnrollmentStatus status, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(admissionService.getApplicationsByStatus(status, pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/track")
    @PreAuthorize("permitAll()")
    public ResponseEntity<ApiResponse<Page<AdmissionListResponse>>> trackByEmail(@RequestParam String email, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(admissionService.getApplicationsByEmail(email, pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('RECEPTIONIST')")
    public ResponseEntity<ApiResponse<AdmissionResponse>> getApplicationById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(admissionService.getApplicationById(id), HttpStatus.OK.value()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('RECEPTIONIST')")
    public ResponseEntity<ApiResponse<AdmissionResponse>> updateApplication(@PathVariable Long id, @Valid @RequestBody AdmissionRequest request) {
        AdmissionResponse response = admissionService.updateApplication(id, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Admission application updated", HttpStatus.OK.value()));
    }

    @PostMapping("/{id}/review")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('RECEPTIONIST')")
    public ResponseEntity<ApiResponse<AdmissionResponse>> reviewApplication(
            @PathVariable Long id,
            @RequestParam EnrollmentStatus status,
            @RequestParam(required = false) String remarks,
            @AuthenticationPrincipal UserDetails principal) {
        AdmissionResponse response = admissionService.reviewApplication(id, status, resolveUserId(principal), remarks);
        return ResponseEntity.ok(ApiResponse.success(response, "Admission application reviewed", HttpStatus.OK.value()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteApplication(@PathVariable Long id) {
        admissionService.deleteApplication(id);
        return ResponseEntity.ok(ApiResponse.success("Admission application deleted", HttpStatus.OK.value()));
    }

    private Long resolveUserId(UserDetails principal) {
        User user = userRepository.findByEmailOrUsername(principal.getUsername(), principal.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", principal.getUsername()));
        return user.getId();
    }
}

