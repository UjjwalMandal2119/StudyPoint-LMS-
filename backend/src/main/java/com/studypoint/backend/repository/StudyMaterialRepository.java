package com.studypoint.backend.repository;

import com.studypoint.backend.entity.StudyMaterial;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyMaterialRepository extends JpaRepository<StudyMaterial, Long> {

    Page<StudyMaterial> findBySubjectId(Long subjectId, Pageable pageable);

    Page<StudyMaterial> findByBatchId(Long batchId, Pageable pageable);

    Page<StudyMaterial> findByUploadedBy(Long uploadedBy, Pageable pageable);

    @Query("SELECT s FROM StudyMaterial s WHERE s.publicAccess = true")
    Page<StudyMaterial> findPublic(Pageable pageable);
}
