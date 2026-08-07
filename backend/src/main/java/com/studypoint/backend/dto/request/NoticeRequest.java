package com.studypoint.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class NoticeRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    @NotBlank(message = "Content is required")
    @Size(max = 5000, message = "Content must not exceed 5000 characters")
    private String content;

    @NotNull(message = "Publish date is required")
    private LocalDate publishDate;

    private LocalDate expiryDate;

    private boolean important;

    @Size(max = 500, message = "Attachment URL must not exceed 500 characters")
    private String attachmentUrl;
}
