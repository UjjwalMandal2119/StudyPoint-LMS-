package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.SubjectRequest;
import com.studypoint.backend.dto.response.SubjectListResponse;
import com.studypoint.backend.dto.response.SubjectResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SubjectService {

    SubjectResponse createSubject(SubjectRequest request);

    SubjectResponse updateSubject(Long id, SubjectRequest request);

    void deleteSubject(Long id);

    Page<SubjectListResponse> getAllSubjects(Pageable pageable);

    SubjectResponse getSubjectById(Long id);

    List<SubjectListResponse> getSubjectsByCourseId(Long courseId);

    List<SubjectListResponse> getSubjectsByTeacherId(Long teacherId);

    SubjectResponse toggleActive(Long id);
}