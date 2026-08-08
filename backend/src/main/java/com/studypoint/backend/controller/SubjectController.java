package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.SubjectRequest;
import com.studypoint.backend.dto.response.SubjectListResponse;
import com.studypoint.backend.dto.response.SubjectResponse;
import com.studypoint.backend.dto.response.ApiResponse;
import com.studypoint.backend.service.SubjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subjects")
@RequiredArgsConstructor
public class SubjectController {

    private final SubjectService subjectService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<SubjectResponse> createSubject(@Valid @RequestBody SubjectRequest request) {
        SubjectResponse response = subjectService.createSubject(request);
        return ApiResponse.success(response, "Subject created successfully", HttpStatus.CREATED.value());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<SubjectResponse> updateSubject(@PathVariable Long id, @Valid @RequestBody SubjectRequest request) {
        SubjectResponse response = subjectService.updateSubject(id, request);
        return ApiResponse.success(response, "Subject updated successfully", HttpStatus.OK.value());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<String> deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
        return ApiResponse.success("Subject deleted successfully", HttpStatus.OK.value());
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<Page<SubjectListResponse>> getAllSubjects(Pageable pageable) {
        Page<SubjectListResponse> subjects = subjectService.getAllSubjects(pageable);
        return ApiResponse.success(subjects, HttpStatus.OK.value());
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<SubjectResponse> getSubjectById(@PathVariable Long id) {
        SubjectResponse subject = subjectService.getSubjectById(id);
        return ApiResponse.success(subject, HttpStatus.OK.value());
    }

    @GetMapping("/course/{courseId}")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<List<SubjectListResponse>> getSubjectsByCourseId(@PathVariable Long courseId) {
        List<SubjectListResponse> subjects = subjectService.getSubjectsByCourseId(courseId);
        return ApiResponse.success(subjects, HttpStatus.OK.value());
    }

    @GetMapping("/teacher/{teacherId}")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<List<SubjectListResponse>> getSubjectsByTeacherId(@PathVariable Long teacherId) {
        List<SubjectListResponse> subjects = subjectService.getSubjectsByTeacherId(teacherId);
        return ApiResponse.success(subjects, HttpStatus.OK.value());
    }

    @PatchMapping("/{id}/toggle-active")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<SubjectResponse> toggleActive(@PathVariable Long id) {
        SubjectResponse subject = subjectService.toggleActive(id);
        return ApiResponse.success(subject, "Subject status toggled successfully", HttpStatus.OK.value());
    }
}
