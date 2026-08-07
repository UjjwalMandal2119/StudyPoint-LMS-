package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.StudyMaterialRequest;
import com.studypoint.backend.dto.response.StudyMaterialListResponse;
import com.studypoint.backend.dto.response.StudyMaterialResponse;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.response.ApiResponse;
import com.studypoint.backend.service.StudyMaterialService;
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
@RequestMapping("/study-materials")
@RequiredArgsConstructor
public class StudyMaterialController {

    private final StudyMaterialService materialService;
    private final UserRepository userRepository;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('TEACHER')")
    public ResponseEntity<ApiResponse<StudyMaterialResponse>> createMaterial(
            @Valid @RequestBody StudyMaterialRequest request,
            @AuthenticationPrincipal UserDetails principal) {
        StudyMaterialResponse response = materialService.createMaterial(request, resolveUserId(principal));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, "Study material uploaded", HttpStatus.CREATED.value()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('TEACHER')")
    public ResponseEntity<ApiResponse<StudyMaterialResponse>> updateMaterial(@PathVariable Long id, @Valid @RequestBody StudyMaterialRequest request) {
        return ResponseEntity.ok(ApiResponse.success(materialService.updateMaterial(id, request), "Study material updated", HttpStatus.OK.value()));
    }

    @GetMapping("/public")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<StudyMaterialListResponse>>> getPublic(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(materialService.getPublic(pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/subject/{subjectId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<StudyMaterialListResponse>>> getBySubject(@PathVariable Long subjectId, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(materialService.getBySubject(subjectId, pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/batch/{batchId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<StudyMaterialListResponse>>> getByBatch(@PathVariable Long batchId, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(materialService.getByBatch(batchId, pageable), HttpStatus.OK.value()));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Page<StudyMaterialListResponse>>> getAll(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(materialService.getAllMaterials(pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<StudyMaterialResponse>> getMaterialById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(materialService.getMaterialById(id), HttpStatus.OK.value()));
    }

    @PostMapping("/{id}/download")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<StudyMaterialResponse>> incrementDownload(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(materialService.incrementDownload(id), "Download recorded", HttpStatus.OK.value()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('TEACHER')")
    public ResponseEntity<ApiResponse<String>> deleteMaterial(@PathVariable Long id) {
        materialService.deleteMaterial(id);
        return ResponseEntity.ok(ApiResponse.success("Study material deleted", HttpStatus.OK.value()));
    }

    private Long resolveUserId(UserDetails principal) {
        User user = userRepository.findByEmailOrUsername(principal.getUsername(), principal.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", principal.getUsername()));
        return user.getId();
    }
}
