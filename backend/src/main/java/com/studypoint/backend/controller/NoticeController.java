package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.NoticeRequest;
import com.studypoint.backend.dto.response.NoticeListResponse;
import com.studypoint.backend.dto.response.NoticeResponse;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.dto.response.ApiResponse;
import com.studypoint.backend.service.NoticeService;
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
@RequestMapping("/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;
    private final UserRepository userRepository;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<NoticeResponse>> createNotice(
            @Valid @RequestBody NoticeRequest request,
            @AuthenticationPrincipal UserDetails principal) {
        NoticeResponse response = noticeService.createNotice(request, resolveUserId(principal));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, "Notice created successfully", HttpStatus.CREATED.value()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<NoticeResponse>> updateNotice(@PathVariable Long id, @Valid @RequestBody NoticeRequest request) {
        return ResponseEntity.ok(ApiResponse.success(noticeService.updateNotice(id, request), "Notice updated", HttpStatus.OK.value()));
    }

    @PostMapping("/{id}/publish")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<NoticeResponse>> publishNotice(@PathVariable Long id, @AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(ApiResponse.success(noticeService.publishNotice(id, resolveUserId(principal)), "Notice published", HttpStatus.OK.value()));
    }

    @PostMapping("/{id}/unpublish")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<NoticeResponse>> unpublishNotice(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(noticeService.unpublishNotice(id), "Notice unpublished", HttpStatus.OK.value()));
    }

    @GetMapping("/published")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<NoticeListResponse>>> getPublished(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(noticeService.getPublishedNotices(pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/active")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<NoticeListResponse>>> getActive(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(noticeService.getActiveNotices(pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/important")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<NoticeListResponse>>> getImportant(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(noticeService.getImportantNotices(pageable), HttpStatus.OK.value()));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Page<NoticeListResponse>>> getAll(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(noticeService.getAllNotices(pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<NoticeResponse>> getNoticeById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(noticeService.getNoticeById(id), HttpStatus.OK.value()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteNotice(@PathVariable Long id) {
        noticeService.deleteNotice(id);
        return ResponseEntity.ok(ApiResponse.success("Notice deleted", HttpStatus.OK.value()));
    }

    private Long resolveUserId(UserDetails principal) {
        User user = userRepository.findByEmailOrUsername(principal.getUsername(), principal.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", principal.getUsername()));
        return user.getId();
    }
}

