package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.SubjectRequest;
import com.studypoint.backend.dto.response.SubjectListResponse;
import com.studypoint.backend.dto.response.SubjectResponse;
import com.studypoint.backend.entity.Course;
import com.studypoint.backend.entity.Subject;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T12:37:11+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class SubjectMapperImpl implements SubjectMapper {

    @Override
    public Subject toSubject(SubjectRequest request) {
        if ( request == null ) {
            return null;
        }

        Subject subject = new Subject();

        subject.setCode( request.getCode() );
        subject.setDescription( request.getDescription() );
        subject.setName( request.getName() );
        if ( request.getPassMarks() != null ) {
            subject.setPassMarks( request.getPassMarks() );
        }
        if ( request.getPractical() != null ) {
            subject.setPractical( request.getPractical() );
        }
        if ( request.getTotalMarks() != null ) {
            subject.setTotalMarks( request.getTotalMarks() );
        }

        return subject;
    }

    @Override
    public SubjectResponse toSubjectResponse(Subject subject) {
        if ( subject == null ) {
            return null;
        }

        String courseName = null;
        boolean active = false;
        String code = null;
        LocalDateTime createdAt = null;
        String description = null;
        Long id = null;
        String name = null;
        Integer passMarks = null;
        boolean practical = false;
        Integer totalMarks = null;
        LocalDateTime updatedAt = null;

        courseName = subjectCourseName( subject );
        active = subject.isActive();
        code = subject.getCode();
        createdAt = subject.getCreatedAt();
        description = subject.getDescription();
        id = subject.getId();
        name = subject.getName();
        passMarks = subject.getPassMarks();
        practical = subject.isPractical();
        totalMarks = subject.getTotalMarks();
        updatedAt = subject.getUpdatedAt();

        Long courseId = subject.getCourse() != null ? subject.getCourse().getId() : null;
        Long teacherId = subject.getTeacher() != null ? subject.getTeacher().getId() : null;

        SubjectResponse subjectResponse = new SubjectResponse( id, name, code, description, courseId, courseName, teacherId, totalMarks, passMarks, practical, active, createdAt, updatedAt );

        return subjectResponse;
    }

    @Override
    public SubjectListResponse toSubjectListResponse(Subject subject) {
        if ( subject == null ) {
            return null;
        }

        String courseName = null;
        boolean active = false;
        String code = null;
        Long id = null;
        String name = null;
        Integer passMarks = null;
        boolean practical = false;
        Integer totalMarks = null;

        courseName = subjectCourseName( subject );
        active = subject.isActive();
        code = subject.getCode();
        id = subject.getId();
        name = subject.getName();
        passMarks = subject.getPassMarks();
        practical = subject.isPractical();
        totalMarks = subject.getTotalMarks();

        String teacherName = subject.getTeacher() != null ? subject.getTeacher().getFirstName() + ' ' + subject.getTeacher().getLastName() : null;

        SubjectListResponse subjectListResponse = new SubjectListResponse( id, name, code, courseName, teacherName, totalMarks, passMarks, practical, active );

        return subjectListResponse;
    }

    @Override
    public void updateSubject(SubjectRequest request, Subject subject) {
        if ( request == null ) {
            return;
        }

        subject.setName( request.getName() );
        subject.setCode( request.getCode() );
        subject.setDescription( request.getDescription() );
        if ( request.getTotalMarks() != null ) {
            subject.setTotalMarks( request.getTotalMarks() );
        }
        if ( request.getPassMarks() != null ) {
            subject.setPassMarks( request.getPassMarks() );
        }
        if ( request.getPractical() != null ) {
            subject.setPractical( request.getPractical() );
        }
    }

    private String subjectCourseName(Subject subject) {
        Course course = subject.getCourse();
        if ( course == null ) {
            return null;
        }
        return course.getName();
    }
}
