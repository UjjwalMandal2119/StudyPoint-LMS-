package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherDashboardStats {

    private String teacherName;
    private String employeeId;
    private String specialization;

    private long subjectCount;
    private long batchCount;
    private long studentCount;

    private long assignmentCount;
    private long pendingSubmissions;
    private long examCount;

    private long unreadNotifications;
}
