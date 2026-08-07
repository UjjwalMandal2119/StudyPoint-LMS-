package com.studypoint.backend.service.impl;

import com.studypoint.backend.dto.request.BatchRequest;
import com.studypoint.backend.dto.response.BatchListResponse;
import com.studypoint.backend.dto.response.BatchResponse;
import com.studypoint.backend.entity.Batch;
import com.studypoint.backend.entity.Course;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.ConflictException;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.BatchMapper;
import com.studypoint.backend.repository.BatchRepository;
import com.studypoint.backend.repository.CourseRepository;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.service.BatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BatchServiceImpl implements BatchService {

    private final BatchRepository batchRepository;
    private final BatchMapper batchMapper;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @Override
    public BatchResponse createBatch(BatchRequest request) {
        if (batchRepository.existsByCode(request.getCode())) {
            throw new ConflictException("Batch code already exists");
        }
        Batch batch = batchMapper.toBatch(request);
        setBatchRelations(batch, request);
        Batch saved = batchRepository.save(batch);
        return batchMapper.toBatchResponse(saved);
    }

    @Override
    public BatchResponse updateBatch(Long id, BatchRequest request) {
        Batch batch = batchRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Batch", "id", id));
        if (batchRepository.existsByCodeAndIdNot(request.getCode(), id)) {
            throw new ConflictException("Batch code already exists");
        }
        batchMapper.updateBatch(request, batch);
        setBatchRelations(batch, request);
        Batch saved = batchRepository.save(batch);
        return batchMapper.toBatchResponse(saved);
    }

    @Override
    public void deleteBatch(Long id) {
        Batch batch = batchRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Batch", "id", id));
        batch.setActive(false);
        batchRepository.save(batch);
    }

    @Override
    public Page<BatchListResponse> getAllBatches(Pageable pageable) {
        return batchRepository.findAll(pageable).map(batchMapper::toBatchListResponse);
    }

    @Override
    public BatchResponse getBatchById(Long id) {
        Batch batch = batchRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Batch", "id", id));
        return batchMapper.toBatchResponse(batch);
    }

    @Override
    public List<BatchListResponse> getBatchesByCourseId(Long courseId) {
        return batchRepository.findByCourseId(courseId).stream()
                .map(batchMapper::toBatchListResponse)
                .toList();
    }

    @Override
    public List<BatchListResponse> getBatchesByTeacherId(Long teacherId) {
        return batchRepository.findByTeacherId(teacherId).stream()
                .map(batchMapper::toBatchListResponse)
                .toList();
    }

    @Override
    public BatchResponse toggleActive(Long id) {
        Batch batch = batchRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Batch", "id", id));
        batch.setActive(!batch.isActive());
        Batch saved = batchRepository.save(batch);
        return batchMapper.toBatchResponse(saved);
    }

    private void setBatchRelations(Batch batch, BatchRequest request) {
        if (request.getCourseId() != null) {
            Course course = courseRepository.findById(request.getCourseId())
                    .orElseThrow(() -> new ResourceNotFoundException("Course", "id", request.getCourseId()));
            batch.setCourse(course);
        }
        if (request.getTeacherId() != null) {
            User teacher = userRepository.findById(request.getTeacherId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getTeacherId()));
            batch.setTeacher(teacher);
        }
    }
}