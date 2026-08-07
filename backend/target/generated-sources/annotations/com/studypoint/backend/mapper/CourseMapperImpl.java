package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.CourseRequest;
import com.studypoint.backend.dto.response.CourseListResponse;
import com.studypoint.backend.dto.response.CourseResponse;
import com.studypoint.backend.entity.Course;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T20:05:42+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class CourseMapperImpl implements CourseMapper {

    @Override
    public Course toCourse(CourseRequest request) {
        if ( request == null ) {
            return null;
        }

        Course course = new Course();

        course.setCode( request.getCode() );
        course.setDescription( request.getDescription() );
        course.setDiscountFee( request.getDiscountFee() );
        if ( request.getDurationMonths() != null ) {
            course.setDurationMonths( request.getDurationMonths() );
        }
        course.setFee( request.getFee() );
        course.setImageUrl( request.getImageUrl() );
        course.setMaxStudents( request.getMaxStudents() );
        course.setName( request.getName() );
        course.setSyllabus( request.getSyllabus() );

        return course;
    }

    @Override
    public CourseResponse toCourseResponse(Course course) {
        if ( course == null ) {
            return null;
        }

        boolean active = false;
        String code = null;
        LocalDateTime createdAt = null;
        String description = null;
        BigDecimal discountFee = null;
        Integer durationMonths = null;
        BigDecimal fee = null;
        Long id = null;
        String imageUrl = null;
        Integer maxStudents = null;
        String name = null;
        boolean published = false;
        String syllabus = null;
        LocalDateTime updatedAt = null;

        active = course.isActive();
        code = course.getCode();
        createdAt = course.getCreatedAt();
        description = course.getDescription();
        discountFee = course.getDiscountFee();
        durationMonths = course.getDurationMonths();
        fee = course.getFee();
        id = course.getId();
        imageUrl = course.getImageUrl();
        maxStudents = course.getMaxStudents();
        name = course.getName();
        published = course.isPublished();
        syllabus = course.getSyllabus();
        updatedAt = course.getUpdatedAt();

        CourseResponse courseResponse = new CourseResponse( id, name, code, description, durationMonths, fee, discountFee, maxStudents, imageUrl, published, syllabus, active, createdAt, updatedAt );

        return courseResponse;
    }

    @Override
    public CourseListResponse toCourseListResponse(Course course) {
        if ( course == null ) {
            return null;
        }

        boolean active = false;
        String code = null;
        Integer durationMonths = null;
        BigDecimal fee = null;
        Long id = null;
        String name = null;
        boolean published = false;

        active = course.isActive();
        code = course.getCode();
        durationMonths = course.getDurationMonths();
        fee = course.getFee();
        id = course.getId();
        name = course.getName();
        published = course.isPublished();

        CourseListResponse courseListResponse = new CourseListResponse( id, name, code, durationMonths, fee, published, active );

        return courseListResponse;
    }

    @Override
    public void updateCourse(CourseRequest request, Course course) {
        if ( request == null ) {
            return;
        }

        course.setName( request.getName() );
        course.setCode( request.getCode() );
        course.setDescription( request.getDescription() );
        if ( request.getDurationMonths() != null ) {
            course.setDurationMonths( request.getDurationMonths() );
        }
        course.setFee( request.getFee() );
        course.setDiscountFee( request.getDiscountFee() );
        course.setMaxStudents( request.getMaxStudents() );
        course.setImageUrl( request.getImageUrl() );
        course.setSyllabus( request.getSyllabus() );
    }
}
