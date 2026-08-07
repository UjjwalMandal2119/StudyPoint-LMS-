package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.CourseRequest;
import com.studypoint.backend.dto.response.CourseListResponse;
import com.studypoint.backend.dto.response.CourseResponse;
import com.studypoint.backend.response.ApiResponse;
import com.studypoint.backend.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<CourseResponse> createCourse(@Valid @RequestBody CourseRequest request) {
        CourseResponse response = courseService.createCourse(request);
        return ApiResponse.success(response, "Course created successfully", HttpStatus.CREATED.value());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<CourseResponse> updateCourse(@PathVariable Long id, @Valid @RequestBody CourseRequest request) {
        CourseResponse response = courseService.updateCourse(id, request);
        return ApiResponse.success(response, "Course updated successfully", HttpStatus.OK.value());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<String> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ApiResponse.success("Course deleted successfully", HttpStatus.OK.value());
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<Page<CourseListResponse>> getAllCourses(Pageable pageable) {
        Page<CourseListResponse> courses = courseService.getAllCourses(pageable);
        return ApiResponse.success(courses, HttpStatus.OK.value());
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<CourseResponse> getCourseById(@PathVariable Long id) {
        CourseResponse course = courseService.getCourseById(id);
        return ApiResponse.success(course, HttpStatus.OK.value());
    }

    @GetMapping("/code/{code}")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<CourseResponse> getCourseByCode(@PathVariable String code) {
        CourseResponse course = courseService.getCourseByCode(code);
        return ApiResponse.success(course, HttpStatus.OK.value());
    }

    @GetMapping("/search")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<Page<CourseListResponse>> searchCourses(@RequestParam String search, Pageable pageable) {
        Page<CourseListResponse> courses = courseService.searchCourses(search, pageable);
        return ApiResponse.success(courses, HttpStatus.OK.value());
    }

    @PostMapping("/{id}/publish")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<CourseResponse> publishCourse(@PathVariable Long id) {
        CourseResponse course = courseService.publishCourse(id);
        return ApiResponse.success(course, "Course published successfully", HttpStatus.OK.value());
    }

    @PatchMapping("/{id}/toggle-active")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<CourseResponse> toggleActive(@PathVariable Long id) {
        CourseResponse course = courseService.toggleActive(id);
        return ApiResponse.success(course, "Course status toggled successfully", HttpStatus.OK.value());
    }
}