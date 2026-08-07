package com.studypoint.backend.service.impl;

import com.studypoint.backend.dto.request.SubjectRequest;
import com.studypoint.backend.dto.response.SubjectListResponse;
import com.studypoint.backend.dto.response.SubjectResponse;
import com.studypoint.backend.entity.Course;
import com.studypoint.backend.entity.Subject;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.ConflictException;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.SubjectMapper;
import com.studypoint.backend.repository.CourseRepository;
import com.studypoint.backend.repository.SubjectRepository;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {

    private final SubjectRepository subjectRepository;
    private final SubjectMapper subjectMapper;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @Override
    public SubjectResponse createSubject(SubjectRequest request) {
        if (subjectRepository.existsByCode(request.getCode())) {
            throw new ConflictException("Subject code already exists");
        }
        Subject subject = subjectMapper.toSubject(request);
        setSubjectRelations(subject, request);
        Subject saved = subjectRepository.save(subject);
        return subjectMapper.toSubjectResponse(saved);
    }

    @Override
    public SubjectResponse updateSubject(Long id, SubjectRequest request) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject", "id", id));
        if (subjectRepository.existsByCodeAndIdNot(request.getCode(), id)) {
            throw new ConflictException("Subject code already exists");
        }
        subjectMapper.updateSubject(request, subject);
        setSubjectRelations(subject, request);
        Subject saved = subjectRepository.save(subject);
        return subjectMapper.toSubjectResponse(saved);
    }

    @Override
    public void deleteSubject(Long id) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject", "id", id));
        subject.setActive(false);
        subjectRepository.save(subject);
    }

    @Override
    public Page<SubjectListResponse> getAllSubjects(Pageable pageable) {
        return subjectRepository.findAll(pageable).map(subjectMapper::toSubjectListResponse);
    }

    @Override
    public SubjectResponse getSubjectById(Long id) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject", "id", id));
        return subjectMapper.toSubjectResponse(subject);
    }

    @Override
    public List<SubjectListResponse> getSubjectsByCourseId(Long courseId) {
        return subjectRepository.findByCourseId(courseId).stream()
                .map(subjectMapper::toSubjectListResponse)
                .toList();
    }

    @Override
    public List<SubjectListResponse> getSubjectsByTeacherId(Long teacherId) {
        return subjectRepository.findByTeacherId(teacherId).stream()
                .map(subjectMapper::toSubjectListResponse)
                .toList();
    }

    @Override
    public SubjectResponse toggleActive(Long id) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject", "id", id));
        subject.setActive(!subject.isActive());
        Subject saved = subjectRepository.save(subject);
        return subjectMapper.toSubjectResponse(saved);
    }

    private void setSubjectRelations(Subject subject, SubjectRequest request) {
        if (request.getCourseId() != null) {
            Course course = courseRepository.findById(request.getCourseId())
                    .orElseThrow(() -> new ResourceNotFoundException("Course", "id", request.getCourseId()));
            subject.setCourse(course);
        }
        if (request.getTeacherId() != null) {
            User teacher = userRepository.findById(request.getTeacherId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getTeacherId()));
            subject.setTeacher(teacher);
        }
    }
}