package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.AttendanceRequest;
import com.studypoint.backend.dto.response.AttendanceResponse;
import com.studypoint.backend.dto.response.AttendanceSummaryResponse;
import com.studypoint.backend.entity.Attendance;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AttendanceMapper {
    @Mapping(target = "student", ignore = true)
    @Mapping(target = "batch", ignore = true)
    Attendance toAttendance(AttendanceRequest request);

    @Mapping(target = "studentName", expression = "java(attendance.getStudent() != null && attendance.getStudent().getUser() != null ? attendance.getStudent().getUser().getFirstName() + \" \" + attendance.getStudent().getUser().getLastName() : null)")
    @Mapping(target = "batchName", expression = "java(attendance.getBatch() != null ? attendance.getBatch().getName() : null)")
    AttendanceResponse toAttendanceResponse(Attendance attendance);

    AttendanceSummaryResponse toAttendanceSummaryResponse(Long totalDays, Long presentDays, Long absentDays, Long lateDays, Double percentage);
}
