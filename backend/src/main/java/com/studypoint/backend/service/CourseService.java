package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.CourseRequest;
import com.studypoint.backend.dto.response.CourseListResponse;
import com.studypoint.backend.dto.response.CourseResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CourseService {

    CourseResponse createCourse(CourseRequest request);

    CourseResponse updateCourse(Long id, CourseRequest request);

    void deleteCourse(Long id);

    Page<CourseListResponse> getAllCourses(Pageable pageable);

    CourseResponse getCourseById(Long id);

    CourseResponse getCourseByCode(String code);

    Page<CourseListResponse> searchCourses(String search, Pageable pageable);

    CourseResponse publishCourse(Long id);

    CourseResponse toggleActive(Long id);
}