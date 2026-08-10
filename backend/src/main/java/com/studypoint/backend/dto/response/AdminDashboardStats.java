package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardStats {

    private long totalStudents;
    private long totalTeachers;
    private long totalParents;
    private long totalUsers;

    private long totalCourses;
    private long totalSubjects;
    private long totalBatches;

    private long pendingAdmissions;
    private long totalEnrollments;

    private long totalExams;
    private long totalAssignments;
    private long totalNotices;
    private long totalDiscussions;

    private long openGrievances;
    private long resolvedGrievances;

    private long maleStudents;
    private long femaleStudents;

    private List<MonthlyTrend> monthlyNewUsers;
    private List<NoticeSummary> recentNotices;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MonthlyTrend {
        private String month;
        private long count;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NoticeSummary {
        private Long id;
        private String title;
        private String publishDate;
        private boolean important;
    }
}
