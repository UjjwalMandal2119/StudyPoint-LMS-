package com.studypoint.backend.controller;

import com.studypoint.backend.constants.DiscussionStatus;
import com.studypoint.backend.dto.request.DiscussionReplyRequest;
import com.studypoint.backend.dto.request.DiscussionRequest;
import com.studypoint.backend.dto.response.DiscussionListResponse;
import com.studypoint.backend.dto.response.DiscussionReplyResponse;
import com.studypoint.backend.dto.response.DiscussionResponse;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.response.ApiResponse;
import com.studypoint.backend.service.DiscussionService;
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
@RequestMapping("/discussions")
@RequiredArgsConstructor
public class DiscussionController {

    private final DiscussionService discussionService;
    private final UserRepository userRepository;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<DiscussionResponse>> createDiscussion(
            @Valid @RequestBody DiscussionRequest request,
            @AuthenticationPrincipal UserDetails principal) {
        DiscussionResponse response = discussionService.createDiscussion(request, resolveUserId(principal));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, "Discussion created", HttpStatus.CREATED.value()));
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<DiscussionListResponse>>> getAll(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.getAllDiscussions(pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/search")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<DiscussionListResponse>>> search(@RequestParam String q, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.searchDiscussions(q, pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/pinned")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<DiscussionListResponse>>> getPinned(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.getPinned(pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/tag/{tag}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<DiscussionListResponse>>> getByTag(@PathVariable String tag, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.getByTag(tag, pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<DiscussionListResponse>>> getByStatus(@PathVariable DiscussionStatus status, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.getByStatus(status, pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/my")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<DiscussionListResponse>>> getMine(
            @AuthenticationPrincipal UserDetails principal, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.getByUser(resolveUserId(principal), pageable), HttpStatus.OK.value()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<DiscussionResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.getDiscussionById(id), HttpStatus.OK.value()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<DiscussionResponse>> update(@PathVariable Long id, @Valid @RequestBody DiscussionRequest request) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.updateDiscussion(id, request), "Discussion updated", HttpStatus.OK.value()));
    }
    @PostMapping("/{id}/like")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<DiscussionResponse>> like(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.likeDiscussion(id), HttpStatus.OK.value()));
    }

    @PostMapping("/{id}/resolve")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<DiscussionResponse>> resolve(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.setStatus(id, DiscussionStatus.RESOLVED), "Discussion resolved", HttpStatus.OK.value()));
    }

    @PostMapping("/{id}/close")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<DiscussionResponse>> close(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.setStatus(id, DiscussionStatus.CLOSED), "Discussion closed", HttpStatus.OK.value()));
    }

    @PostMapping("/{id}/pin")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<DiscussionResponse>> pin(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.pinDiscussion(id, true), "Discussion pinned", HttpStatus.OK.value()));
    }

    @PostMapping("/{id}/unpin")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<DiscussionResponse>> unpin(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.pinDiscussion(id, false), "Discussion unpinned", HttpStatus.OK.value()));
    }

    @PostMapping("/{id}/report")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<DiscussionResponse>> report(@PathVariable Long id, @RequestParam(required = false) String reason) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.reportDiscussion(id, reason), "Discussion reported", HttpStatus.OK.value()));
    }

    @PostMapping("/{id}/replies")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<DiscussionReplyResponse>> addReply(
            @PathVariable Long id,
            @Valid @RequestBody DiscussionReplyRequest request,
            @AuthenticationPrincipal UserDetails principal) {
        DiscussionReplyResponse response = discussionService.addReply(id, request, resolveUserId(principal));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, "Reply added", HttpStatus.CREATED.value()));
    }

    @GetMapping("/{id}/replies")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<DiscussionReplyResponse>>> getReplies(@PathVariable Long id, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.getReplies(id, pageable), HttpStatus.OK.value()));
    }

    @PostMapping("/replies/{replyId}/like")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<DiscussionReplyResponse>> likeReply(@PathVariable Long replyId) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.likeReply(replyId), HttpStatus.OK.value()));
    }

    @PostMapping("/replies/{replyId}/accept")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<DiscussionReplyResponse>> acceptAnswer(@PathVariable Long replyId) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.acceptAnswer(replyId), "Answer accepted", HttpStatus.OK.value()));
    }

    @DeleteMapping("/replies/{replyId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<String>> deleteReply(@PathVariable Long replyId) {
        discussionService.deleteReply(replyId);
        return ResponseEntity.ok(ApiResponse.success("Reply deleted", HttpStatus.OK.value()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<String>> delete(@PathVariable Long id) {
        discussionService.deleteDiscussion(id);
        return ResponseEntity.ok(ApiResponse.success("Discussion deleted", HttpStatus.OK.value()));
    }

    private Long resolveUserId(UserDetails principal) {
        User user = userRepository.findByEmailOrUsername(principal.getUsername(), principal.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", principal.getUsername()));
        return user.getId();
    }
}
