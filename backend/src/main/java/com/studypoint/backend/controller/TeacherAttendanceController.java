package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.TeacherAttendanceRequest;
import com.studypoint.backend.dto.response.TeacherAttendanceResponse;
import com.studypoint.backend.service.TeacherAttendanceService;
import com.studypoint.backend.dto.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/teacher-attendance")
@RequiredArgsConstructor
public class TeacherAttendanceController {
    private final TeacherAttendanceService teacherAttendanceService;

    @PostMapping("/mark")
    public ResponseEntity<ApiResponse<TeacherAttendanceResponse>> markTeacherAttendance(@Valid @RequestBody TeacherAttendanceRequest request) {
        TeacherAttendanceResponse response = teacherAttendanceService.markTeacherAttendance(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response, "Teacher attendance marked successfully", HttpStatus.CREATED.value()));
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<ApiResponse<List<TeacherAttendanceResponse>>> getTeacherAttendanceByTeacherId(
            @PathVariable Long teacherId,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        List<TeacherAttendanceResponse> attendances = teacherAttendanceService.getTeacherAttendanceByTeacherId(teacherId, startDate, endDate);
        return ResponseEntity.ok(ApiResponse.success(attendances, HttpStatus.OK.value()));
    }
}

