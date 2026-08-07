package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.TeacherAttendanceRequest;
import com.studypoint.backend.dto.response.TeacherAttendanceResponse;
import com.studypoint.backend.entity.TeacherAttendance;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T12:37:11+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class TeacherAttendanceMapperImpl implements TeacherAttendanceMapper {

    @Override
    public TeacherAttendance toTeacherAttendance(TeacherAttendanceRequest request) {
        if ( request == null ) {
            return null;
        }

        TeacherAttendance teacherAttendance = new TeacherAttendance();

        teacherAttendance.setAttendanceDate( request.getAttendanceDate() );
        teacherAttendance.setCheckInTime( request.getCheckInTime() );
        teacherAttendance.setCheckOutTime( request.getCheckOutTime() );
        teacherAttendance.setRemarks( request.getRemarks() );
        teacherAttendance.setStatus( request.getStatus() );

        return teacherAttendance;
    }

    @Override
    public TeacherAttendanceResponse toTeacherAttendanceResponse(TeacherAttendance teacherAttendance) {
        if ( teacherAttendance == null ) {
            return null;
        }

        TeacherAttendanceResponse teacherAttendanceResponse = new TeacherAttendanceResponse();

        teacherAttendanceResponse.setActive( teacherAttendance.isActive() );
        teacherAttendanceResponse.setAttendanceDate( teacherAttendance.getAttendanceDate() );
        teacherAttendanceResponse.setCheckInTime( teacherAttendance.getCheckInTime() );
        teacherAttendanceResponse.setCheckOutTime( teacherAttendance.getCheckOutTime() );
        teacherAttendanceResponse.setCreatedAt( teacherAttendance.getCreatedAt() );
        teacherAttendanceResponse.setId( teacherAttendance.getId() );
        teacherAttendanceResponse.setMarkedBy( teacherAttendance.getMarkedBy() );
        teacherAttendanceResponse.setRemarks( teacherAttendance.getRemarks() );
        teacherAttendanceResponse.setStatus( teacherAttendance.getStatus() );

        teacherAttendanceResponse.setTeacherName( teacherAttendance.getTeacher() != null && teacherAttendance.getTeacher().getUser() != null ? teacherAttendance.getTeacher().getUser().getFirstName() + " " + teacherAttendance.getTeacher().getUser().getLastName() : null );

        return teacherAttendanceResponse;
    }
}
