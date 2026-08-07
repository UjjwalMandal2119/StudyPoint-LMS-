package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class StudyMaterialResponse {

    private Long id;
    private String title;
    private String description;
    private Long subjectId;
    private String subjectName;
    private Long batchId;
    private String batchName;
    private String fileUrl;
    private String fileType;
    private Long fileSize;
    private Long uploadedBy;
    private String uploaderName;
    private boolean publicAccess;
    private int downloadCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}