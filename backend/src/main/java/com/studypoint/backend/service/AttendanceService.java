package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.AttendanceRequest;
import com.studypoint.backend.dto.request.BulkAttendanceRequest;
import com.studypoint.backend.dto.response.AttendanceResponse;
import com.studypoint.backend.dto.response.AttendanceSummaryResponse;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {
    AttendanceResponse markAttendance(AttendanceRequest request);
    List<AttendanceResponse> markBulkAttendance(BulkAttendanceRequest request);
    List<AttendanceResponse> getAttendanceByStudentId(Long studentId, LocalDate startDate, LocalDate endDate);
    List<AttendanceResponse> getAttendanceByBatchId(Long batchId, LocalDate attendanceDate);
    AttendanceSummaryResponse getAttendanceSummary(Long studentId, LocalDate startDate, LocalDate endDate);
}
