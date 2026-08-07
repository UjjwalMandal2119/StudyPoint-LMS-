package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class StudyMaterialListResponse {

    private Long id;
    private String title;
    private String subjectName;
    private String batchName;
    private String fileUrl;
    private String fileType;
    private boolean publicAccess;
    private int downloadCount;
    private LocalDateTime createdAt;
}