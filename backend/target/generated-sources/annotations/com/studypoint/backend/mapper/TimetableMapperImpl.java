package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.TimetableRequest;
import com.studypoint.backend.dto.response.TimetableListResponse;
import com.studypoint.backend.dto.response.TimetableResponse;
import com.studypoint.backend.entity.Batch;
import com.studypoint.backend.entity.Subject;
import com.studypoint.backend.entity.Timetable;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T20:05:41+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class TimetableMapperImpl implements TimetableMapper {

    @Override
    public Timetable toTimetable(TimetableRequest request) {
        if ( request == null ) {
            return null;
        }

        Timetable timetable = new Timetable();

        timetable.setDayOfWeek( request.getDayOfWeek() );
        timetable.setEndTime( request.getEndTime() );
        timetable.setRoomNumber( request.getRoomNumber() );
        timetable.setStartTime( request.getStartTime() );

        return timetable;
    }

    @Override
    public TimetableResponse toTimetableResponse(Timetable timetable) {
        if ( timetable == null ) {
            return null;
        }

        String batchName = null;
        String subjectName = null;
        boolean active = false;
        LocalDateTime createdAt = null;
        DayOfWeek dayOfWeek = null;
        LocalTime endTime = null;
        Long id = null;
        String roomNumber = null;
        LocalTime startTime = null;
        LocalDateTime updatedAt = null;

        batchName = timetableBatchName( timetable );
        subjectName = timetableSubjectName( timetable );
        active = timetable.isActive();
        createdAt = timetable.getCreatedAt();
        dayOfWeek = timetable.getDayOfWeek();
        endTime = timetable.getEndTime();
        id = timetable.getId();
        roomNumber = timetable.getRoomNumber();
        startTime = timetable.getStartTime();
        updatedAt = timetable.getUpdatedAt();

        Long batchId = timetable.getBatch() != null ? timetable.getBatch().getId() : null;
        Long subjectId = timetable.getSubject() != null ? timetable.getSubject().getId() : null;
        Long teacherId = timetable.getTeacher() != null ? timetable.getTeacher().getId() : null;
        String teacherName = timetable.getTeacher() != null && timetable.getTeacher().getUser() != null ? timetable.getTeacher().getUser().getFirstName() + " " + timetable.getTeacher().getUser().getLastName() : null;

        TimetableResponse timetableResponse = new TimetableResponse( id, batchId, batchName, subjectId, subjectName, teacherId, teacherName, dayOfWeek, startTime, endTime, roomNumber, active, createdAt, updatedAt );

        return timetableResponse;
    }

    @Override
    public TimetableListResponse toTimetableListResponse(Timetable timetable) {
        if ( timetable == null ) {
            return null;
        }

        String batchName = null;
        String subjectName = null;
        boolean active = false;
        DayOfWeek dayOfWeek = null;
        LocalTime endTime = null;
        Long id = null;
        String roomNumber = null;
        LocalTime startTime = null;

        batchName = timetableBatchName( timetable );
        subjectName = timetableSubjectName( timetable );
        active = timetable.isActive();
        dayOfWeek = timetable.getDayOfWeek();
        endTime = timetable.getEndTime();
        id = timetable.getId();
        roomNumber = timetable.getRoomNumber();
        startTime = timetable.getStartTime();

        String teacherName = timetable.getTeacher() != null && timetable.getTeacher().getUser() != null ? timetable.getTeacher().getUser().getFirstName() + " " + timetable.getTeacher().getUser().getLastName() : null;

        TimetableListResponse timetableListResponse = new TimetableListResponse( id, batchName, subjectName, teacherName, dayOfWeek, startTime, endTime, roomNumber, active );

        return timetableListResponse;
    }

    @Override
    public void updateTimetable(TimetableRequest request, Timetable timetable) {
        if ( request == null ) {
            return;
        }

        timetable.setDayOfWeek( request.getDayOfWeek() );
        timetable.setStartTime( request.getStartTime() );
        timetable.setEndTime( request.getEndTime() );
        timetable.setRoomNumber( request.getRoomNumber() );
    }

    private String timetableBatchName(Timetable timetable) {
        Batch batch = timetable.getBatch();
        if ( batch == null ) {
            return null;
        }
        return batch.getName();
    }

    private String timetableSubjectName(Timetable timetable) {
        Subject subject = timetable.getSubject();
        if ( subject == null ) {
            return null;
        }
        return subject.getName();
    }
}
