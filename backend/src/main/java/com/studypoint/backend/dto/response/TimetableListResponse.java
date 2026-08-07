package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class TimetableListResponse {

    private Long id;
    private String batchName;
    private String subjectName;
    private String teacherName;
    private DayOfWeek dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
    private String roomNumber;
    private boolean active;
}