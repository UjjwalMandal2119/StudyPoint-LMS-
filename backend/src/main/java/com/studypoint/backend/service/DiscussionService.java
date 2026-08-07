package com.studypoint.backend.service;

import com.studypoint.backend.constants.DiscussionStatus;
import com.studypoint.backend.dto.request.DiscussionReplyRequest;
import com.studypoint.backend.dto.request.DiscussionRequest;
import com.studypoint.backend.dto.response.DiscussionListResponse;
import com.studypoint.backend.dto.response.DiscussionReplyResponse;
import com.studypoint.backend.dto.response.DiscussionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DiscussionService {

    DiscussionResponse createDiscussion(DiscussionRequest request, Long userId);

    DiscussionResponse updateDiscussion(Long id, DiscussionRequest request);

    DiscussionResponse getDiscussionById(Long id);

    Page<DiscussionListResponse> getAllDiscussions(Pageable pageable);

    Page<DiscussionListResponse> searchDiscussions(String search, Pageable pageable);

    Page<DiscussionListResponse> getByUser(Long userId, Pageable pageable);

    Page<DiscussionListResponse> getByStatus(DiscussionStatus status, Pageable pageable);

    Page<DiscussionListResponse> getByTag(String tag, Pageable pageable);

    Page<DiscussionListResponse> getPinned(Pageable pageable);

    DiscussionResponse likeDiscussion(Long id);

    DiscussionResponse setStatus(Long id, DiscussionStatus status);

    DiscussionResponse pinDiscussion(Long id, boolean pinned);

    DiscussionResponse reportDiscussion(Long id, String reason);

    void deleteDiscussion(Long id);

    DiscussionReplyResponse addReply(Long discussionId, DiscussionReplyRequest request, Long userId);

    Page<DiscussionReplyResponse> getReplies(Long discussionId, Pageable pageable);

    DiscussionReplyResponse likeReply(Long replyId);

    DiscussionReplyResponse acceptAnswer(Long replyId);

    void deleteReply(Long replyId);
}
