package com.studypoint.backend.dto.response;

import com.studypoint.backend.constants.DiscussionStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class DiscussionListResponse {

    private Long id;
    private String title;
    private String tag;
    private String userName;
    private DiscussionStatus status;
    private int likeCount;
    private int replyCount;
    private int viewCount;
    private boolean pinned;
    private LocalDateTime createdAt;
}
