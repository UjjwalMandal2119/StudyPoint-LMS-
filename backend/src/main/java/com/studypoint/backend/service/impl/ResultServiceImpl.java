package com.studypoint.backend.service.impl;

import com.studypoint.backend.dto.request.ResultRequest;
import com.studypoint.backend.dto.response.ResultListResponse;
import com.studypoint.backend.dto.response.ResultResponse;
import com.studypoint.backend.entity.Result;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.ResultMapper;
import com.studypoint.backend.repository.ResultRepository;
import com.studypoint.backend.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ResultServiceImpl implements ResultService {

    private final ResultRepository resultRepository;

    private final ResultMapper resultMapper;

    @Override
    public ResultResponse createResult(ResultRequest resultRequest) {
        Result result = resultMapper.toResult(resultRequest);
        Result savedResult = resultRepository.save(result);
        return resultMapper.toResultResponse(savedResult);
    }

    @Override
    public ResultResponse publishResult(Long id) {
        Result result = resultRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Result", "id", id));
        result.setPublishedAt(java.time.LocalDateTime.now());
        Result updatedResult = resultRepository.save(result);
        return resultMapper.toResultResponse(updatedResult);
    }

    @Override
    @Transactional(readOnly = true)
    public ResultResponse getResultById(Long id) {
        Result result = resultRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Result", "id", id));
        return resultMapper.toResultResponse(result);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ResultResponse> getAllResults(Pageable pageable) {
        return resultRepository.findAll(pageable).map(resultMapper::toResultResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ResultResponse> getResultsByExamId(Long examId, Pageable pageable) {
        return resultRepository.findByExamId(examId, pageable).map(resultMapper::toResultResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ResultResponse> getResultsByStudentId(Long studentId, Pageable pageable) {
        return resultRepository.findByStudentId(studentId, pageable).map(resultMapper::toResultResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public ResultResponse getStudentResultForExam(Long examId, Long studentId) {
        Result result = resultRepository.findByExamIdAndStudentId(examId, studentId);
        if (result == null) {
            throw new ResourceNotFoundException("Result", "examId and studentId", examId + ", " + studentId);
        }
        return resultMapper.toResultResponse(result);
    }
}