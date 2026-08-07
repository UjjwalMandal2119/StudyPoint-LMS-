package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class DiscussionReplyResponse {

    private Long id;
    private Long discussionId;
    private Long userId;
    private String userName;
    private String content;
    private Long parentReplyId;
    private int likeCount;
    private boolean acceptedAnswer;
    private boolean reported;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
