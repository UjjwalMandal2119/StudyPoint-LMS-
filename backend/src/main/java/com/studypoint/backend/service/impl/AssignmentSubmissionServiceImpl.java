package com.studypoint.backend.service.impl;

import com.studypoint.backend.dto.request.AssignmentSubmissionRequest;
import com.studypoint.backend.dto.response.AssignmentSubmissionListResponse;
import com.studypoint.backend.dto.response.AssignmentSubmissionResponse;
import com.studypoint.backend.entity.AssignmentSubmission;
import com.studypoint.backend.constants.SubmissionStatus;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.AssignmentSubmissionMapper;
import com.studypoint.backend.repository.AssignmentSubmissionRepository;
import com.studypoint.backend.service.AssignmentSubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class AssignmentSubmissionServiceImpl implements AssignmentSubmissionService {

    private final AssignmentSubmissionRepository assignmentSubmissionRepository;

    private final AssignmentSubmissionMapper assignmentSubmissionMapper;

    @Override
    public AssignmentSubmissionResponse submitAssignment(AssignmentSubmissionRequest assignmentSubmissionRequest) {
        AssignmentSubmission submission = assignmentSubmissionMapper.toAssignmentSubmission(assignmentSubmissionRequest);
        submission.setSubmittedAt(LocalDateTime.now());
        submission.setStatus(SubmissionStatus.SUBMITTED);
        AssignmentSubmission savedSubmission = assignmentSubmissionRepository.save(submission);
        return assignmentSubmissionMapper.toAssignmentSubmissionResponse(savedSubmission);
    }

    @Override
    public AssignmentSubmissionResponse gradeSubmission(Long id, Integer marksObtained, String feedback) {
        AssignmentSubmission submission = assignmentSubmissionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AssignmentSubmission", "id", id));
        submission.setMarksObtained(marksObtained);
        submission.setFeedback(feedback);
        submission.setStatus(SubmissionStatus.GRADED);
        submission.setGradedAt(LocalDateTime.now());
        AssignmentSubmission updatedSubmission = assignmentSubmissionRepository.save(submission);
        return assignmentSubmissionMapper.toAssignmentSubmissionResponse(updatedSubmission);
    }

    @Override
    @Transactional(readOnly = true)
    public AssignmentSubmissionResponse getSubmissionById(Long id) {
        AssignmentSubmission submission = assignmentSubmissionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AssignmentSubmission", "id", id));
        return assignmentSubmissionMapper.toAssignmentSubmissionResponse(submission);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AssignmentSubmissionResponse> getAllSubmissions(Pageable pageable) {
        return assignmentSubmissionRepository.findAll(pageable).map(assignmentSubmissionMapper::toAssignmentSubmissionResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AssignmentSubmissionResponse> getSubmissionsByAssignmentId(Long assignmentId, Pageable pageable) {
        return assignmentSubmissionRepository.findByAssignmentId(assignmentId, pageable)
                .map(assignmentSubmissionMapper::toAssignmentSubmissionResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AssignmentSubmissionResponse> getSubmissionsByStudentId(Long studentId, Pageable pageable) {
        return assignmentSubmissionRepository.findByStudentId(studentId, pageable)
                .map(assignmentSubmissionMapper::toAssignmentSubmissionResponse);
    }
}