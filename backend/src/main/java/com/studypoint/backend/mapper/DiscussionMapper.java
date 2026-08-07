package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.DiscussionReplyRequest;
import com.studypoint.backend.dto.request.DiscussionRequest;
import com.studypoint.backend.dto.response.DiscussionListResponse;
import com.studypoint.backend.dto.response.DiscussionReplyResponse;
import com.studypoint.backend.dto.response.DiscussionResponse;
import com.studypoint.backend.entity.Discussion;
import com.studypoint.backend.entity.DiscussionReply;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface DiscussionMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "likeCount", ignore = true)
    @Mapping(target = "replyCount", ignore = true)
    @Mapping(target = "viewCount", ignore = true)
    @Mapping(target = "pinned", ignore = true)
    @Mapping(target = "reported", ignore = true)
    @Mapping(target = "reportReason", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Discussion toDiscussion(DiscussionRequest request);

    @Mapping(target = "userId", expression = "java(discussion.getUser() != null ? discussion.getUser().getId() : null)")
    @Mapping(target = "userName", expression = "java(discussion.getUser() != null ? discussion.getUser().getFirstName() + ' ' + discussion.getUser().getLastName() : null)")
    DiscussionResponse toDiscussionResponse(Discussion discussion);

    @Mapping(target = "userName", expression = "java(discussion.getUser() != null ? discussion.getUser().getFirstName() + ' ' + discussion.getUser().getLastName() : null)")
    DiscussionListResponse toDiscussionListResponse(Discussion discussion);

    @Mapping(target = "discussionId", expression = "java(reply.getDiscussion() != null ? reply.getDiscussion().getId() : null)")
    @Mapping(target = "userId", expression = "java(reply.getUser() != null ? reply.getUser().getId() : null)")
    @Mapping(target = "userName", expression = "java(reply.getUser() != null ? reply.getUser().getFirstName() + ' ' + reply.getUser().getLastName() : null)")
    @Mapping(target = "parentReplyId", expression = "java(reply.getParentReply() != null ? reply.getParentReply().getId() : null)")
    DiscussionReplyResponse toReplyResponse(DiscussionReply reply);
}
