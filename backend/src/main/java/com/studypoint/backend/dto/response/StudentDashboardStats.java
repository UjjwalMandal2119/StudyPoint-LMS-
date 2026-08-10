package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDashboardStats {

    private String studentName;
    private String rollNumber;
    private String batchName;

    private long totalDays;
    private long presentDays;
    private long attendancePercentage;

    private long assignmentCount;
    private long pendingAssignmentCount;

    private long examCount;
    private long upcomingExamsCount;

    private long resultCount;
    private double averagePercentage;

    private long enrollmentCount;
    private long unreadNotifications;
}
