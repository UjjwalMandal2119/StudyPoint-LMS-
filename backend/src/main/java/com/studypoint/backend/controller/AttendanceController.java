package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.AttendanceRequest;
import com.studypoint.backend.dto.request.BulkAttendanceRequest;
import com.studypoint.backend.dto.response.AttendanceResponse;
import com.studypoint.backend.dto.response.AttendanceSummaryResponse;
import com.studypoint.backend.service.AttendanceService;
import com.studypoint.backend.dto.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/attendance")
@RequiredArgsConstructor
public class AttendanceController {
    private final AttendanceService attendanceService;

    @PostMapping("/mark")
    public ResponseEntity<ApiResponse<AttendanceResponse>> markAttendance(@Valid @RequestBody AttendanceRequest request) {
        AttendanceResponse response = attendanceService.markAttendance(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response, "Attendance marked successfully", HttpStatus.CREATED.value()));
    }

    @PostMapping("/bulk-mark")
    public ResponseEntity<ApiResponse<List<AttendanceResponse>>> markBulkAttendance(@Valid @RequestBody BulkAttendanceRequest request) {
        List<AttendanceResponse> responses = attendanceService.markBulkAttendance(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(responses, "Bulk attendance marked successfully", HttpStatus.CREATED.value()));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<List<AttendanceResponse>>> getAttendanceByStudentId(
            @PathVariable Long studentId,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        List<AttendanceResponse> attendances = attendanceService.getAttendanceByStudentId(studentId, startDate, endDate);
        return ResponseEntity.ok(ApiResponse.success(attendances, HttpStatus.OK.value()));
    }

    @GetMapping("/batch/{batchId}")
    public ResponseEntity<ApiResponse<List<AttendanceResponse>>> getAttendanceByBatchId(
            @PathVariable Long batchId,
            @RequestParam LocalDate attendanceDate) {
        List<AttendanceResponse> attendances = attendanceService.getAttendanceByBatchId(batchId, attendanceDate);
        return ResponseEntity.ok(ApiResponse.success(attendances, HttpStatus.OK.value()));
    }

    @GetMapping("/summary/{studentId}")
    public ResponseEntity<ApiResponse<AttendanceSummaryResponse>> getAttendanceSummary(
            @PathVariable Long studentId,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        AttendanceSummaryResponse summary = attendanceService.getAttendanceSummary(studentId, startDate, endDate);
        return ResponseEntity.ok(ApiResponse.success(summary, HttpStatus.OK.value()));
    }
}

