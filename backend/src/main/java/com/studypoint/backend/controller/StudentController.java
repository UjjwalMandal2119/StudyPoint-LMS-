package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.StudentRequest;
import com.studypoint.backend.dto.response.StudentListResponse;
import com.studypoint.backend.dto.response.StudentResponse;
import com.studypoint.backend.service.StudentService;
import com.studypoint.backend.dto.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @PostMapping
    public ResponseEntity<ApiResponse<StudentResponse>> createStudent(@Valid @RequestBody StudentRequest request) {
        StudentResponse response = studentService.createStudent(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response, "Student created successfully", HttpStatus.CREATED.value()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentResponse>> updateStudent(@PathVariable Long id, @Valid @RequestBody StudentRequest request) {
        StudentResponse response = studentService.updateStudent(id, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Student updated successfully", HttpStatus.OK.value()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok(ApiResponse.success("Student deleted successfully", HttpStatus.OK.value()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<StudentListResponse>>> getAllStudents(Pageable pageable) {
        Page<StudentListResponse> students = studentService.getAllStudents(pageable);
        return ResponseEntity.ok(ApiResponse.success(students, HttpStatus.OK.value()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentResponse>> getStudentById(@PathVariable Long id) {
        StudentResponse response = studentService.getStudentById(id);
        return ResponseEntity.ok(ApiResponse.success(response, HttpStatus.OK.value()));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<StudentResponse>> getStudentByUserId(@PathVariable Long userId) {
        StudentResponse response = studentService.getStudentByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success(response, HttpStatus.OK.value()));
    }

    @GetMapping("/batch/{batchId}")
    public ResponseEntity<ApiResponse<java.util.List<StudentListResponse>>> getStudentsByBatchId(@PathVariable Long batchId) {
        java.util.List<StudentListResponse> students = studentService.getStudentsByBatchId(batchId);
        return ResponseEntity.ok(ApiResponse.success(students, HttpStatus.OK.value()));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<StudentListResponse>>> searchStudents(
            @RequestParam String search,
            Pageable pageable) {
        Page<StudentListResponse> students = studentService.searchStudents(search, pageable);
        return ResponseEntity.ok(ApiResponse.success(students, HttpStatus.OK.value()));
    }
}

