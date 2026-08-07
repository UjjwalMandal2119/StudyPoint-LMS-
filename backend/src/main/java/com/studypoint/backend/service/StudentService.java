package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.StudentRequest;
import com.studypoint.backend.dto.response.StudentListResponse;
import com.studypoint.backend.dto.response.StudentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudentService {
    StudentResponse createStudent(StudentRequest request);
    StudentResponse updateStudent(Long id, StudentRequest request);
    void deleteStudent(Long id);
    StudentResponse getStudentById(Long id);
    StudentResponse getStudentByUserId(Long userId);
    java.util.List<StudentListResponse> getStudentsByBatchId(Long batchId);
    Page<StudentListResponse> getAllStudents(Pageable pageable);
    Page<StudentListResponse> searchStudents(String search, Pageable pageable);
}
