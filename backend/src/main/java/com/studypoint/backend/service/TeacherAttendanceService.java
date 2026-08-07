package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.TeacherAttendanceRequest;
import com.studypoint.backend.dto.response.TeacherAttendanceResponse;

import java.time.LocalDate;
import java.util.List;

public interface TeacherAttendanceService {
    TeacherAttendanceResponse markTeacherAttendance(TeacherAttendanceRequest request);
    List<TeacherAttendanceResponse> getTeacherAttendanceByTeacherId(Long teacherId, LocalDate startDate, LocalDate endDate);
}
