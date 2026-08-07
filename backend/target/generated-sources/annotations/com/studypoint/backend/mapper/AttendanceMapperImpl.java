package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.AttendanceRequest;
import com.studypoint.backend.dto.response.AttendanceResponse;
import com.studypoint.backend.dto.response.AttendanceSummaryResponse;
import com.studypoint.backend.entity.Attendance;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T12:37:11+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class AttendanceMapperImpl implements AttendanceMapper {

    @Override
    public Attendance toAttendance(AttendanceRequest request) {
        if ( request == null ) {
            return null;
        }

        Attendance attendance = new Attendance();

        attendance.setAttendanceDate( request.getAttendanceDate() );
        attendance.setRemarks( request.getRemarks() );
        attendance.setStatus( request.getStatus() );

        return attendance;
    }

    @Override
    public AttendanceResponse toAttendanceResponse(Attendance attendance) {
        if ( attendance == null ) {
            return null;
        }

        AttendanceResponse attendanceResponse = new AttendanceResponse();

        attendanceResponse.setActive( attendance.isActive() );
        attendanceResponse.setAttendanceDate( attendance.getAttendanceDate() );
        attendanceResponse.setCreatedAt( attendance.getCreatedAt() );
        attendanceResponse.setId( attendance.getId() );
        attendanceResponse.setMarkedBy( attendance.getMarkedBy() );
        attendanceResponse.setRemarks( attendance.getRemarks() );
        attendanceResponse.setStatus( attendance.getStatus() );

        attendanceResponse.setStudentName( attendance.getStudent() != null && attendance.getStudent().getUser() != null ? attendance.getStudent().getUser().getFirstName() + " " + attendance.getStudent().getUser().getLastName() : null );
        attendanceResponse.setBatchName( attendance.getBatch() != null ? attendance.getBatch().getName() : null );

        return attendanceResponse;
    }

    @Override
    public AttendanceSummaryResponse toAttendanceSummaryResponse(Long totalDays, Long presentDays, Long absentDays, Long lateDays, Double percentage) {
        if ( totalDays == null && presentDays == null && absentDays == null && lateDays == null && percentage == null ) {
            return null;
        }

        AttendanceSummaryResponse attendanceSummaryResponse = new AttendanceSummaryResponse();

        attendanceSummaryResponse.setTotalDays( totalDays );
        attendanceSummaryResponse.setPresentDays( presentDays );
        attendanceSummaryResponse.setAbsentDays( absentDays );
        attendanceSummaryResponse.setLateDays( lateDays );
        attendanceSummaryResponse.setPercentage( percentage );

        return attendanceSummaryResponse;
    }
}
