package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PublicProgramResponse {

    private Long id;
    private String name;
    private String code;
    private String description;
    private Integer durationMonths;
    private String imageUrl;
    private String syllabus;
}
