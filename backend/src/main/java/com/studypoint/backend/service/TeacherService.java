package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.TeacherRequest;
import com.studypoint.backend.dto.response.TeacherListResponse;
import com.studypoint.backend.dto.response.TeacherResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TeacherService {
    TeacherResponse createTeacher(TeacherRequest request);
    TeacherResponse updateTeacher(Long id, TeacherRequest request);
    void deleteTeacher(Long id);
    TeacherResponse getTeacherById(Long id);
    TeacherResponse getTeacherByUserId(Long userId);
    Page<TeacherListResponse> getAllTeachers(Pageable pageable);
    Page<TeacherListResponse> searchTeachers(String search, Pageable pageable);
}
