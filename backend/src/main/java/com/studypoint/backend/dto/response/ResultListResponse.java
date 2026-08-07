package com.studypoint.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResultListResponse {

    private Long id;
    private String examTitle;
    private String studentName;
    private int marksObtained;
    private double percentage;
    private String grade;
    private Integer rank;
    private boolean passed;
}