package com.studypoint.backend.controller;

import com.studypoint.backend.dto.response.AdminDashboardStats;
import com.studypoint.backend.dto.response.ApiResponse;
import com.studypoint.backend.dto.response.ParentDashboardStats;
import com.studypoint.backend.dto.response.StudentDashboardStats;
import com.studypoint.backend.dto.response.TeacherDashboardStats;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    private final UserRepository userRepository;

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<AdminDashboardStats>> getAdminStats(
            @AuthenticationPrincipal UserDetails principal) {
        AdminDashboardStats stats = dashboardService.getAdminStats();
        return ResponseEntity.ok(ApiResponse.success(stats, "Admin dashboard stats", HttpStatus.OK.value()));
    }

    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<StudentDashboardStats>> getStudentStats(
            @AuthenticationPrincipal UserDetails principal) {
        StudentDashboardStats stats = dashboardService.getStudentStats(resolveUserId(principal));
        return ResponseEntity.ok(ApiResponse.success(stats, "Student dashboard stats", HttpStatus.OK.value()));
    }

    @GetMapping("/teacher")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<ApiResponse<TeacherDashboardStats>> getTeacherStats(
            @AuthenticationPrincipal UserDetails principal) {
        TeacherDashboardStats stats = dashboardService.getTeacherStats(resolveUserId(principal));
        return ResponseEntity.ok(ApiResponse.success(stats, "Teacher dashboard stats", HttpStatus.OK.value()));
    }

    @GetMapping("/parent")
    @PreAuthorize("hasRole('PARENT')")
    public ResponseEntity<ApiResponse<ParentDashboardStats>> getParentStats(
            @AuthenticationPrincipal UserDetails principal) {
        ParentDashboardStats stats = dashboardService.getParentStats(resolveUserId(principal));
        return ResponseEntity.ok(ApiResponse.success(stats, "Parent dashboard stats", HttpStatus.OK.value()));
    }

    private Long resolveUserId(UserDetails principal) {
        User user = userRepository.findByEmailOrUsername(principal.getUsername(), principal.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", principal.getUsername()));
        return user.getId();
    }
}