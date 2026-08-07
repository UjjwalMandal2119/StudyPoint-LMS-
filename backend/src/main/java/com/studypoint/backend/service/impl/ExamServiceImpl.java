package com.studypoint.backend.service.impl;

import com.studypoint.backend.dto.request.ExamRequest;
import com.studypoint.backend.dto.response.ExamListResponse;
import com.studypoint.backend.dto.response.ExamResponse;
import com.studypoint.backend.entity.Batch;
import com.studypoint.backend.entity.Exam;
import com.studypoint.backend.entity.Subject;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.ExamMapper;
import com.studypoint.backend.repository.BatchRepository;
import com.studypoint.backend.repository.ExamRepository;
import com.studypoint.backend.repository.SubjectRepository;
import com.studypoint.backend.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ExamServiceImpl implements ExamService {

    private final ExamRepository examRepository;

    private final ExamMapper examMapper;
    private final BatchRepository batchRepository;
    private final SubjectRepository subjectRepository;

    @Override
    public ExamResponse createExam(ExamRequest examRequest) {
        Exam exam = examMapper.toExam(examRequest);
        resolveRelations(exam, examRequest.getBatchId(), examRequest.getSubjectId());
        Exam savedExam = examRepository.save(exam);
        return examMapper.toExamResponse(savedExam);
    }

    @Override
    public ExamResponse updateExam(Long id, ExamRequest examRequest) {
        Exam existingExam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", "id", id));
        existingExam.setTitle(examRequest.getTitle());
        existingExam.setDescription(examRequest.getDescription());
        resolveRelations(existingExam, examRequest.getBatchId(), examRequest.getSubjectId());
        existingExam.setExamType(examRequest.getExamType());
        existingExam.setStartTime(examRequest.getStartTime());
        existingExam.setEndTime(examRequest.getEndTime());
        existingExam.setTotalMarks(examRequest.getTotalMarks());
        existingExam.setPassMarks(examRequest.getPassMarks());
        existingExam.setInstructions(examRequest.getInstructions());
        Exam updatedExam = examRepository.save(existingExam);
        return examMapper.toExamResponse(updatedExam);
    }

    private void resolveRelations(Exam exam, Long batchId, Long subjectId) {
        if (batchId != null) {
            Batch batch = batchRepository.findById(batchId)
                    .orElseThrow(() -> new ResourceNotFoundException("Batch", "id", batchId));
            exam.setBatch(batch);
        }
        if (subjectId != null) {
            Subject subject = subjectRepository.findById(subjectId)
                    .orElseThrow(() -> new ResourceNotFoundException("Subject", "id", subjectId));
            exam.setSubject(subject);
        }
    }

    @Override
    public void deleteExam(Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", "id", id));
        examRepository.delete(exam);
    }

    @Override
    @Transactional(readOnly = true)
    public ExamResponse getExamById(Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", "id", id));
        return examMapper.toExamResponse(exam);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ExamListResponse> getAllExams(Pageable pageable) {
        return examRepository.findAll(pageable).map(examMapper::toExamListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ExamListResponse> getExamsByBatchId(Long batchId, Pageable pageable) {
        return examRepository.findByBatchId(batchId, pageable).map(examMapper::toExamListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ExamListResponse> getExamsBySubjectId(Long subjectId, Pageable pageable) {
        return examRepository.findBySubjectId(subjectId, pageable).map(examMapper::toExamListResponse);
    }

    @Override
    public ExamResponse publishExam(Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", "id", id));
        exam.setPublished(true);
        Exam updatedExam = examRepository.save(exam);
        return examMapper.toExamResponse(updatedExam);
    }
}