package com.studypoint.backend.mapper;

import com.studypoint.backend.constants.DiscussionStatus;
import com.studypoint.backend.dto.request.DiscussionRequest;
import com.studypoint.backend.dto.response.DiscussionListResponse;
import com.studypoint.backend.dto.response.DiscussionReplyResponse;
import com.studypoint.backend.dto.response.DiscussionResponse;
import com.studypoint.backend.entity.Discussion;
import com.studypoint.backend.entity.DiscussionReply;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T20:05:42+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class DiscussionMapperImpl implements DiscussionMapper {

    @Override
    public Discussion toDiscussion(DiscussionRequest request) {
        if ( request == null ) {
            return null;
        }

        Discussion discussion = new Discussion();

        discussion.setContent( request.getContent() );
        discussion.setTag( request.getTag() );
        discussion.setTitle( request.getTitle() );

        return discussion;
    }

    @Override
    public DiscussionResponse toDiscussionResponse(Discussion discussion) {
        if ( discussion == null ) {
            return null;
        }

        String content = null;
        LocalDateTime createdAt = null;
        Long id = null;
        int likeCount = 0;
        boolean pinned = false;
        int replyCount = 0;
        String reportReason = null;
        boolean reported = false;
        DiscussionStatus status = null;
        String tag = null;
        String title = null;
        LocalDateTime updatedAt = null;
        int viewCount = 0;

        content = discussion.getContent();
        createdAt = discussion.getCreatedAt();
        id = discussion.getId();
        likeCount = discussion.getLikeCount();
        pinned = discussion.isPinned();
        replyCount = discussion.getReplyCount();
        reportReason = discussion.getReportReason();
        reported = discussion.isReported();
        status = discussion.getStatus();
        tag = discussion.getTag();
        title = discussion.getTitle();
        updatedAt = discussion.getUpdatedAt();
        viewCount = discussion.getViewCount();

        Long userId = discussion.getUser() != null ? discussion.getUser().getId() : null;
        String userName = discussion.getUser() != null ? discussion.getUser().getFirstName() + ' ' + discussion.getUser().getLastName() : null;

        DiscussionResponse discussionResponse = new DiscussionResponse( id, title, content, userId, userName, tag, status, likeCount, replyCount, viewCount, pinned, reported, reportReason, createdAt, updatedAt );

        return discussionResponse;
    }

    @Override
    public DiscussionListResponse toDiscussionListResponse(Discussion discussion) {
        if ( discussion == null ) {
            return null;
        }

        LocalDateTime createdAt = null;
        Long id = null;
        int likeCount = 0;
        boolean pinned = false;
        int replyCount = 0;
        DiscussionStatus status = null;
        String tag = null;
        String title = null;
        int viewCount = 0;

        createdAt = discussion.getCreatedAt();
        id = discussion.getId();
        likeCount = discussion.getLikeCount();
        pinned = discussion.isPinned();
        replyCount = discussion.getReplyCount();
        status = discussion.getStatus();
        tag = discussion.getTag();
        title = discussion.getTitle();
        viewCount = discussion.getViewCount();

        String userName = discussion.getUser() != null ? discussion.getUser().getFirstName() + ' ' + discussion.getUser().getLastName() : null;

        DiscussionListResponse discussionListResponse = new DiscussionListResponse( id, title, tag, userName, status, likeCount, replyCount, viewCount, pinned, createdAt );

        return discussionListResponse;
    }

    @Override
    public DiscussionReplyResponse toReplyResponse(DiscussionReply reply) {
        if ( reply == null ) {
            return null;
        }

        boolean acceptedAnswer = false;
        String content = null;
        LocalDateTime createdAt = null;
        Long id = null;
        int likeCount = 0;
        boolean reported = false;
        LocalDateTime updatedAt = null;

        acceptedAnswer = reply.isAcceptedAnswer();
        content = reply.getContent();
        createdAt = reply.getCreatedAt();
        id = reply.getId();
        likeCount = reply.getLikeCount();
        reported = reply.isReported();
        updatedAt = reply.getUpdatedAt();

        Long discussionId = reply.getDiscussion() != null ? reply.getDiscussion().getId() : null;
        Long userId = reply.getUser() != null ? reply.getUser().getId() : null;
        String userName = reply.getUser() != null ? reply.getUser().getFirstName() + ' ' + reply.getUser().getLastName() : null;
        Long parentReplyId = reply.getParentReply() != null ? reply.getParentReply().getId() : null;

        DiscussionReplyResponse discussionReplyResponse = new DiscussionReplyResponse( id, discussionId, userId, userName, content, parentReplyId, likeCount, acceptedAnswer, reported, createdAt, updatedAt );

        return discussionReplyResponse;
    }
}
