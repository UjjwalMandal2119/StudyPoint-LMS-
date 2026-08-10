package com.studypoint.backend.service;

import com.studypoint.backend.dto.response.AdminDashboardStats;
import com.studypoint.backend.dto.response.ParentDashboardStats;
import com.studypoint.backend.dto.response.StudentDashboardStats;
import com.studypoint.backend.dto.response.TeacherDashboardStats;

public interface DashboardService {

    AdminDashboardStats getAdminStats();

    StudentDashboardStats getStudentStats(Long userId);

    TeacherDashboardStats getTeacherStats(Long userId);

    ParentDashboardStats getParentStats(Long userId);
}