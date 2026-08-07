package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.StudyMaterialRequest;
import com.studypoint.backend.dto.response.StudyMaterialListResponse;
import com.studypoint.backend.dto.response.StudyMaterialResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudyMaterialService {

    StudyMaterialResponse createMaterial(StudyMaterialRequest request, Long uploadedBy);

    StudyMaterialResponse updateMaterial(Long id, StudyMaterialRequest request);

    StudyMaterialResponse getMaterialById(Long id);

    Page<StudyMaterialListResponse> getAllMaterials(Pageable pageable);

    Page<StudyMaterialListResponse> getBySubject(Long subjectId, Pageable pageable);

    Page<StudyMaterialListResponse> getByBatch(Long batchId, Pageable pageable);

    Page<StudyMaterialListResponse> getPublic(Pageable pageable);

    Page<StudyMaterialListResponse> getByUploader(Long uploadedBy, Pageable pageable);

    StudyMaterialResponse incrementDownload(Long id);

    void deleteMaterial(Long id);
}
