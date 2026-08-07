package com.studypoint.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class DiscussionReplyRequest {

    @NotBlank(message = "Reply content is required")
    @Size(max = 5000, message = "Reply must not exceed 5000 characters")
    private String content;

    private Long parentReplyId;
}
