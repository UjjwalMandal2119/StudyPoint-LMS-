package com.studypoint.backend.service.impl;

import com.studypoint.backend.dto.request.StudyMaterialRequest;
import com.studypoint.backend.dto.response.StudyMaterialListResponse;
import com.studypoint.backend.dto.response.StudyMaterialResponse;
import com.studypoint.backend.entity.Batch;
import com.studypoint.backend.entity.Subject;
import com.studypoint.backend.entity.StudyMaterial;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.StudyMaterialMapper;
import com.studypoint.backend.repository.BatchRepository;
import com.studypoint.backend.repository.StudyMaterialRepository;
import com.studypoint.backend.repository.SubjectRepository;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.service.StudyMaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StudyMaterialServiceImpl implements StudyMaterialService {

    private final StudyMaterialRepository materialRepository;
    private final SubjectRepository subjectRepository;
    private final BatchRepository batchRepository;
    private final UserRepository userRepository;
    private final StudyMaterialMapper materialMapper;

    @Override
    @Transactional
    public StudyMaterialResponse createMaterial(StudyMaterialRequest request, Long uploadedBy) {
        StudyMaterial material = materialMapper.toStudyMaterial(request);
        setRelations(material, request);
        material.setUploadedBy(uploadedBy);
        return toResponse(materialRepository.save(material));
    }

    @Override
    @Transactional
    public StudyMaterialResponse updateMaterial(Long id, StudyMaterialRequest request) {
        StudyMaterial material = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Study material", "id", id));
        materialMapper.updateStudyMaterial(request, material);
        setRelations(material, request);
        return toResponse(materialRepository.save(material));
    }

    @Override
    @Transactional(readOnly = true)
    public StudyMaterialResponse getMaterialById(Long id) {
        StudyMaterial material = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Study material", "id", id));
        return toResponse(material);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StudyMaterialListResponse> getAllMaterials(Pageable pageable) {
        return materialRepository.findAll(pageable).map(materialMapper::toStudyMaterialListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StudyMaterialListResponse> getBySubject(Long subjectId, Pageable pageable) {
        return materialRepository.findBySubjectId(subjectId, pageable).map(materialMapper::toStudyMaterialListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StudyMaterialListResponse> getByBatch(Long batchId, Pageable pageable) {
        return materialRepository.findByBatchId(batchId, pageable).map(materialMapper::toStudyMaterialListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StudyMaterialListResponse> getPublic(Pageable pageable) {
        return materialRepository.findPublic(pageable).map(materialMapper::toStudyMaterialListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StudyMaterialListResponse> getByUploader(Long uploadedBy, Pageable pageable) {
        return materialRepository.findByUploadedBy(uploadedBy, pageable).map(materialMapper::toStudyMaterialListResponse);
    }

    @Override
    @Transactional
    public StudyMaterialResponse incrementDownload(Long id) {
        StudyMaterial material = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Study material", "id", id));
        material.setDownloadCount(material.getDownloadCount() + 1);
        return toResponse(materialRepository.save(material));
    }

    @Override
    @Transactional
    public void deleteMaterial(Long id) {
        StudyMaterial material = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Study material", "id", id));
        material.setActive(false);
        materialRepository.save(material);
    }

    private void setRelations(StudyMaterial material, StudyMaterialRequest request) {
        if (request.getSubjectId() != null) {
            Subject subject = subjectRepository.findById(request.getSubjectId())
                    .orElseThrow(() -> new ResourceNotFoundException("Subject", "id", request.getSubjectId()));
            material.setSubject(subject);
        }
        if (request.getBatchId() != null) {
            Batch batch = batchRepository.findById(request.getBatchId())
                    .orElseThrow(() -> new ResourceNotFoundException("Batch", "id", request.getBatchId()));
            material.setBatch(batch);
        }
    }

    private StudyMaterialResponse toResponse(StudyMaterial material) {
        StudyMaterialResponse response = materialMapper.toStudyMaterialResponse(material);
        userRepository.findById(material.getUploadedBy()).ifPresent(user ->
                response.setUploaderName(user.getFirstName() + " " + user.getLastName()));
        return response;
    }
}
