package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.TeacherRequest;
import com.studypoint.backend.dto.response.TeacherListResponse;
import com.studypoint.backend.dto.response.TeacherResponse;
import com.studypoint.backend.service.TeacherService;
import com.studypoint.backend.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teachers")
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherService teacherService;

    @PostMapping
    public ResponseEntity<ApiResponse<TeacherResponse>> createTeacher(@Valid @RequestBody TeacherRequest request) {
        TeacherResponse response = teacherService.createTeacher(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response, "Teacher created successfully", HttpStatus.CREATED.value()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TeacherResponse>> updateTeacher(@PathVariable Long id, @Valid @RequestBody TeacherRequest request) {
        TeacherResponse response = teacherService.updateTeacher(id, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Teacher updated successfully", HttpStatus.OK.value()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
        return ResponseEntity.ok(ApiResponse.success("Teacher deleted successfully", HttpStatus.OK.value()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<TeacherListResponse>>> getAllTeachers(Pageable pageable) {
        Page<TeacherListResponse> teachers = teacherService.getAllTeachers(pageable);
        return ResponseEntity.ok(ApiResponse.success(teachers, HttpStatus.OK.value()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TeacherResponse>> getTeacherById(@PathVariable Long id) {
        TeacherResponse response = teacherService.getTeacherById(id);
        return ResponseEntity.ok(ApiResponse.success(response, HttpStatus.OK.value()));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<TeacherResponse>> getTeacherByUserId(@PathVariable Long userId) {
        TeacherResponse response = teacherService.getTeacherByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success(response, HttpStatus.OK.value()));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<TeacherListResponse>>> searchTeachers(
            @RequestParam String search,
            Pageable pageable) {
        Page<TeacherListResponse> teachers = teacherService.searchTeachers(search, pageable);
        return ResponseEntity.ok(ApiResponse.success(teachers, HttpStatus.OK.value()));
    }
}
