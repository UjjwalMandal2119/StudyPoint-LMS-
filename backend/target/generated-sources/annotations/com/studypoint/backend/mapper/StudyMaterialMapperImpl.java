package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.StudyMaterialRequest;
import com.studypoint.backend.dto.response.StudyMaterialListResponse;
import com.studypoint.backend.dto.response.StudyMaterialResponse;
import com.studypoint.backend.entity.StudyMaterial;
import com.studypoint.backend.entity.Subject;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T20:05:42+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class StudyMaterialMapperImpl implements StudyMaterialMapper {

    @Override
    public StudyMaterial toStudyMaterial(StudyMaterialRequest request) {
        if ( request == null ) {
            return null;
        }

        StudyMaterial studyMaterial = new StudyMaterial();

        studyMaterial.setDescription( request.getDescription() );
        studyMaterial.setFileSize( request.getFileSize() );
        studyMaterial.setFileType( request.getFileType() );
        studyMaterial.setFileUrl( request.getFileUrl() );
        studyMaterial.setPublicAccess( request.isPublicAccess() );
        studyMaterial.setTitle( request.getTitle() );

        return studyMaterial;
    }

    @Override
    public StudyMaterialResponse toStudyMaterialResponse(StudyMaterial material) {
        if ( material == null ) {
            return null;
        }

        String subjectName = null;
        LocalDateTime createdAt = null;
        String description = null;
        int downloadCount = 0;
        Long fileSize = null;
        String fileType = null;
        String fileUrl = null;
        Long id = null;
        boolean publicAccess = false;
        String title = null;
        LocalDateTime updatedAt = null;
        Long uploadedBy = null;

        subjectName = materialSubjectName( material );
        createdAt = material.getCreatedAt();
        description = material.getDescription();
        downloadCount = material.getDownloadCount();
        fileSize = material.getFileSize();
        fileType = material.getFileType();
        fileUrl = material.getFileUrl();
        id = material.getId();
        publicAccess = material.isPublicAccess();
        title = material.getTitle();
        updatedAt = material.getUpdatedAt();
        uploadedBy = material.getUploadedBy();

        Long subjectId = material.getSubject() != null ? material.getSubject().getId() : null;
        Long batchId = material.getBatch() != null ? material.getBatch().getId() : null;
        String batchName = material.getBatch() != null ? material.getBatch().getName() : null;
        String uploaderName = null;

        StudyMaterialResponse studyMaterialResponse = new StudyMaterialResponse( id, title, description, subjectId, subjectName, batchId, batchName, fileUrl, fileType, fileSize, uploadedBy, uploaderName, publicAccess, downloadCount, createdAt, updatedAt );

        return studyMaterialResponse;
    }

    @Override
    public StudyMaterialListResponse toStudyMaterialListResponse(StudyMaterial material) {
        if ( material == null ) {
            return null;
        }

        LocalDateTime createdAt = null;
        int downloadCount = 0;
        String fileType = null;
        String fileUrl = null;
        Long id = null;
        boolean publicAccess = false;
        String title = null;

        createdAt = material.getCreatedAt();
        downloadCount = material.getDownloadCount();
        fileType = material.getFileType();
        fileUrl = material.getFileUrl();
        id = material.getId();
        publicAccess = material.isPublicAccess();
        title = material.getTitle();

        String subjectName = material.getSubject() != null ? material.getSubject().getName() : null;
        String batchName = material.getBatch() != null ? material.getBatch().getName() : null;

        StudyMaterialListResponse studyMaterialListResponse = new StudyMaterialListResponse( id, title, subjectName, batchName, fileUrl, fileType, publicAccess, downloadCount, createdAt );

        return studyMaterialListResponse;
    }

    @Override
    public void updateStudyMaterial(StudyMaterialRequest request, StudyMaterial material) {
        if ( request == null ) {
            return;
        }

        material.setTitle( request.getTitle() );
        material.setDescription( request.getDescription() );
        material.setFileUrl( request.getFileUrl() );
        material.setFileType( request.getFileType() );
        material.setFileSize( request.getFileSize() );
        material.setPublicAccess( request.isPublicAccess() );
    }

    private String materialSubjectName(StudyMaterial studyMaterial) {
        Subject subject = studyMaterial.getSubject();
        if ( subject == null ) {
            return null;
        }
        return subject.getName();
    }
}
