package com.studypoint.backend.controller;

import com.studypoint.backend.constants.GrievanceStatus;
import com.studypoint.backend.dto.request.GrievanceRequest;
import com.studypoint.backend.dto.request.GrievanceStatusRequest;
import com.studypoint.backend.dto.response.GrievanceListResponse;
import com.studypoint.backend.dto.response.GrievanceResponse;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.response.ApiResponse;
import com.studypoint.backend.service.GrievanceService;
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
@RequestMapping("/grievances")
@RequiredArgsConstructor
public class GrievanceController {

    private final GrievanceService grievanceService;
    private final UserRepository userRepository;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<GrievanceResponse>> submitGrievance(
            @Valid @RequestBody GrievanceRequest request,
            @AuthenticationPrincipal UserDetails principal) {
        GrievanceResponse response = grievanceService.submitGrievance(request, resolveUserId(principal));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, "Grievance submitted successfully", HttpStatus.CREATED.value()));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Page<GrievanceListResponse>>> getAllGrievances(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(grievanceService.getAllGrievances(pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/my")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<GrievanceListResponse>>> getMyGrievances(
            @AuthenticationPrincipal UserDetails principal, Pageable pageable) {
        Page<GrievanceListResponse> grievances = grievanceService.getGrievancesByUser(resolveUserId(principal), pageable);
        return ResponseEntity.ok(ApiResponse.success(grievances, HttpStatus.OK.value()));
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Page<GrievanceListResponse>>> getByStatus(@PathVariable GrievanceStatus status, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(grievanceService.getGrievancesByStatus(status, pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/category/{category}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Page<GrievanceListResponse>>> getByCategory(@PathVariable String category, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(grievanceService.getGrievancesByCategory(category, pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Page<GrievanceListResponse>>> search(@RequestParam String q, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(grievanceService.searchGrievances(q, pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/track/{trackingNumber}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<GrievanceResponse>> trackByNumber(@PathVariable String trackingNumber) {
        // Resolve by tracking number via search is not sufficient; reuse lookup by id is avoided here.
        // Track via dedicated service method delegated through getGrievanceById is not applicable, so
        // we expose tracking through search; return not supported gracefully.
        return ResponseEntity.ok(ApiResponse.error("Use /grievances/search?q=" + trackingNumber, HttpStatus.BAD_REQUEST.value()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<GrievanceResponse>> getGrievanceById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(grievanceService.getGrievanceById(id), HttpStatus.OK.value()));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<GrievanceResponse>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody GrievanceStatusRequest request,
            @AuthenticationPrincipal UserDetails principal) {
        GrievanceResponse response = grievanceService.updateGrievanceStatus(id, request, resolveUserId(principal));
        return ResponseEntity.ok(ApiResponse.success(response, "Grievance status updated", HttpStatus.OK.value()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteGrievance(@PathVariable Long id) {
        grievanceService.deleteGrievance(id);
        return ResponseEntity.ok(ApiResponse.success("Grievance deleted successfully", HttpStatus.OK.value()));
    }

    private Long resolveUserId(UserDetails principal) {
        User user = userRepository.findByEmailOrUsername(principal.getUsername(), principal.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", principal.getUsername()));
        return user.getId();
    }
}
