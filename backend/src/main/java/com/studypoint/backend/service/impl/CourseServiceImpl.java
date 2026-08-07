package com.studypoint.backend.service.impl;

import com.studypoint.backend.dto.request.CourseRequest;
import com.studypoint.backend.dto.response.CourseListResponse;
import com.studypoint.backend.dto.response.CourseResponse;
import com.studypoint.backend.entity.Course;
import com.studypoint.backend.exception.ConflictException;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.CourseMapper;
import com.studypoint.backend.repository.CourseRepository;
import com.studypoint.backend.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    @Override
    public CourseResponse createCourse(CourseRequest request) {
        if (courseRepository.existsByCode(request.getCode())) {
            throw new ConflictException("Course code already exists");
        }
        Course course = courseMapper.toCourse(request);
        Course saved = courseRepository.save(course);
        return courseMapper.toCourseResponse(saved);
    }

    @Override
    public CourseResponse updateCourse(Long id, CourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id));
        if (courseRepository.existsByCodeAndIdNot(request.getCode(), id)) {
            throw new ConflictException("Course code already exists");
        }
        courseMapper.updateCourse(request, course);
        Course saved = courseRepository.save(course);
        return courseMapper.toCourseResponse(saved);
    }

    @Override
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id));
        course.setActive(false);
        courseRepository.save(course);
    }

    @Override
    public Page<CourseListResponse> getAllCourses(Pageable pageable) {
        return courseRepository.findAll(pageable).map(courseMapper::toCourseListResponse);
    }

    @Override
    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id));
        return courseMapper.toCourseResponse(course);
    }

    @Override
    public CourseResponse getCourseByCode(String code) {
        Course course = courseRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "code", code));
        return courseMapper.toCourseResponse(course);
    }

    @Override
    public Page<CourseListResponse> searchCourses(String search, Pageable pageable) {
        return courseRepository.search(search, pageable).map(courseMapper::toCourseListResponse);
    }

    @Override
    public CourseResponse publishCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id));
        course.setPublished(true);
        Course saved = courseRepository.save(course);
        return courseMapper.toCourseResponse(saved);
    }

    @Override
    public CourseResponse toggleActive(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id));
        course.setActive(!course.isActive());
        Course saved = courseRepository.save(course);
        return courseMapper.toCourseResponse(saved);
    }
}