package com.studypoint.backend.service.impl;

import com.studypoint.backend.dto.request.AssignmentRequest;
import com.studypoint.backend.dto.response.AssignmentListResponse;
import com.studypoint.backend.dto.response.AssignmentResponse;
import com.studypoint.backend.entity.Assignment;
import com.studypoint.backend.entity.Batch;
import com.studypoint.backend.entity.Subject;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.AssignmentMapper;
import com.studypoint.backend.repository.AssignmentRepository;
import com.studypoint.backend.repository.BatchRepository;
import com.studypoint.backend.repository.SubjectRepository;
import com.studypoint.backend.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AssignmentServiceImpl implements AssignmentService {

    private final AssignmentRepository assignmentRepository;

    private final AssignmentMapper assignmentMapper;
    private final BatchRepository batchRepository;
    private final SubjectRepository subjectRepository;

    @Override
    public AssignmentResponse createAssignment(AssignmentRequest assignmentRequest) {
        Assignment assignment = assignmentMapper.toAssignment(assignmentRequest);
        resolveRelations(assignment, assignmentRequest.getBatchId(), assignmentRequest.getSubjectId());
        Assignment savedAssignment = assignmentRepository.save(assignment);
        return assignmentMapper.toAssignmentResponse(savedAssignment);
    }

    @Override
    public AssignmentResponse updateAssignment(Long id, AssignmentRequest assignmentRequest) {
        Assignment existingAssignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment", "id", id));
        existingAssignment.setTitle(assignmentRequest.getTitle());
        existingAssignment.setDescription(assignmentRequest.getDescription());
        resolveRelations(existingAssignment, assignmentRequest.getBatchId(), assignmentRequest.getSubjectId());
        existingAssignment.setDueDate(assignmentRequest.getDueDate());
        existingAssignment.setTotalMarks(assignmentRequest.getTotalMarks());
        existingAssignment.setFileUrl(assignmentRequest.getFileUrl());
        existingAssignment.setLateSubmissionAllowed(assignmentRequest.isLateSubmissionAllowed());
        Assignment updatedAssignment = assignmentRepository.save(existingAssignment);
        return assignmentMapper.toAssignmentResponse(updatedAssignment);
    }

    private void resolveRelations(Assignment assignment, Long batchId, Long subjectId) {
        if (batchId != null) {
            Batch batch = batchRepository.findById(batchId)
                    .orElseThrow(() -> new ResourceNotFoundException("Batch", "id", batchId));
            assignment.setBatch(batch);
        }
        if (subjectId != null) {
            Subject subject = subjectRepository.findById(subjectId)
                    .orElseThrow(() -> new ResourceNotFoundException("Subject", "id", subjectId));
            assignment.setSubject(subject);
        }
    }

    @Override
    public void deleteAssignment(Long id) {
        Assignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment", "id", id));
        assignmentRepository.delete(assignment);
    }

    @Override
    @Transactional(readOnly = true)
    public AssignmentResponse getAssignmentById(Long id) {
        Assignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment", "id", id));
        return assignmentMapper.toAssignmentResponse(assignment);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AssignmentListResponse> getAllAssignments(Pageable pageable) {
        return assignmentRepository.findAll(pageable).map(assignmentMapper::toAssignmentListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AssignmentListResponse> getAssignmentsByBatchId(Long batchId, Pageable pageable) {
        return assignmentRepository.findByBatchId(batchId, pageable).map(assignmentMapper::toAssignmentListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AssignmentListResponse> getAssignmentsBySubjectId(Long subjectId, Pageable pageable) {
        return assignmentRepository.findBySubjectId(subjectId, pageable).map(assignmentMapper::toAssignmentListResponse);
    }

    @Override
    public AssignmentResponse publishAssignment(Long id) {
        Assignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment", "id", id));
        assignment.setStatus(com.studypoint.backend.constants.AssignmentStatus.PUBLISHED);
        Assignment updatedAssignment = assignmentRepository.save(assignment);
        return assignmentMapper.toAssignmentResponse(updatedAssignment);
    }
}