package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.DiscussionStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class DiscussionResponse {

    private Long id;
    private String title;
    private String content;
    private Long userId;
    private String userName;
    private String tag;
    private DiscussionStatus status;
    private int likeCount;
    private int replyCount;
    private int viewCount;
    private boolean pinned;
    private boolean reported;
    private String reportReason;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
