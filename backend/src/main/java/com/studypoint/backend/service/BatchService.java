package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.BatchRequest;
import com.studypoint.backend.dto.response.BatchListResponse;
import com.studypoint.backend.dto.response.BatchResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BatchService {

    BatchResponse createBatch(BatchRequest request);

    BatchResponse updateBatch(Long id, BatchRequest request);

    void deleteBatch(Long id);

    Page<BatchListResponse> getAllBatches(Pageable pageable);

    BatchResponse getBatchById(Long id);

    List<BatchListResponse> getBatchesByCourseId(Long courseId);

    List<BatchListResponse> getBatchesByTeacherId(Long teacherId);

    BatchResponse toggleActive(Long id);
}