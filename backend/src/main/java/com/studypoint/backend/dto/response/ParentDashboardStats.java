package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParentDashboardStats {

    private long childCount;
    private long unreadNotifications;

    private List<ChildSummary> children;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChildSummary {
        private Long studentId;
        private String studentName;
        private String rollNumber;
        private String batchName;
        private long attendancePercentage;
        private double averagePercentage;
    }
}
