package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.BatchRequest;
import com.studypoint.backend.dto.response.BatchListResponse;
import com.studypoint.backend.dto.response.BatchResponse;
import com.studypoint.backend.entity.Batch;
import com.studypoint.backend.entity.Course;
import java.time.LocalDate;
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
public class BatchMapperImpl implements BatchMapper {

    @Override
    public Batch toBatch(BatchRequest request) {
        if ( request == null ) {
            return null;
        }

        Batch batch = new Batch();

        batch.setClassDays( request.getClassDays() );
        batch.setClassTime( request.getClassTime() );
        batch.setCode( request.getCode() );
        batch.setEndDate( request.getEndDate() );
        batch.setMaxStudents( request.getMaxStudents() );
        batch.setName( request.getName() );
        batch.setRoomNumber( request.getRoomNumber() );
        batch.setStartDate( request.getStartDate() );

        return batch;
    }

    @Override
    public BatchResponse toBatchResponse(Batch batch) {
        if ( batch == null ) {
            return null;
        }

        String courseName = null;
        boolean active = false;
        String classDays = null;
        LocalTime classTime = null;
        String code = null;
        LocalDateTime createdAt = null;
        LocalDate endDate = null;
        Long id = null;
        Integer maxStudents = null;
        String name = null;
        String roomNumber = null;
        LocalDate startDate = null;
        LocalDateTime updatedAt = null;

        courseName = batchCourseName( batch );
        active = batch.isActive();
        classDays = batch.getClassDays();
        classTime = batch.getClassTime();
        code = batch.getCode();
        createdAt = batch.getCreatedAt();
        endDate = batch.getEndDate();
        id = batch.getId();
        maxStudents = batch.getMaxStudents();
        name = batch.getName();
        roomNumber = batch.getRoomNumber();
        startDate = batch.getStartDate();
        updatedAt = batch.getUpdatedAt();

        Long courseId = batch.getCourse() != null ? batch.getCourse().getId() : null;
        Long teacherId = batch.getTeacher() != null ? batch.getTeacher().getId() : null;

        BatchResponse batchResponse = new BatchResponse( id, name, code, courseId, courseName, teacherId, startDate, endDate, classTime, classDays, roomNumber, maxStudents, active, createdAt, updatedAt );

        return batchResponse;
    }

    @Override
    public BatchListResponse toBatchListResponse(Batch batch) {
        if ( batch == null ) {
            return null;
        }

        String courseName = null;
        boolean active = false;
        String code = null;
        LocalDate endDate = null;
        Long id = null;
        String name = null;
        LocalDate startDate = null;

        courseName = batchCourseName( batch );
        active = batch.isActive();
        code = batch.getCode();
        endDate = batch.getEndDate();
        id = batch.getId();
        name = batch.getName();
        startDate = batch.getStartDate();

        String teacherName = batch.getTeacher() != null ? batch.getTeacher().getFirstName() + ' ' + batch.getTeacher().getLastName() : null;

        BatchListResponse batchListResponse = new BatchListResponse( id, name, code, courseName, teacherName, startDate, endDate, active );

        return batchListResponse;
    }

    @Override
    public void updateBatch(BatchRequest request, Batch batch) {
        if ( request == null ) {
            return;
        }

        batch.setName( request.getName() );
        batch.setCode( request.getCode() );
        batch.setStartDate( request.getStartDate() );
        batch.setEndDate( request.getEndDate() );
        batch.setClassTime( request.getClassTime() );
        batch.setClassDays( request.getClassDays() );
        batch.setRoomNumber( request.getRoomNumber() );
        batch.setMaxStudents( request.getMaxStudents() );
    }

    private String batchCourseName(Batch batch) {
        Course course = batch.getCourse();
        if ( course == null ) {
            return null;
        }
        return course.getName();
    }
}
