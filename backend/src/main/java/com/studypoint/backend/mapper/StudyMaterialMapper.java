package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.StudyMaterialRequest;
import com.studypoint.backend.dto.response.StudyMaterialListResponse;
import com.studypoint.backend.dto.response.StudyMaterialResponse;
import com.studypoint.backend.entity.StudyMaterial;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface StudyMaterialMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "subject", ignore = true)
    @Mapping(target = "batch", ignore = true)
    @Mapping(target = "uploadedBy", ignore = true)
    @Mapping(target = "downloadCount", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    StudyMaterial toStudyMaterial(StudyMaterialRequest request);

    @Mapping(target = "subjectId", expression = "java(material.getSubject() != null ? material.getSubject().getId() : null)")
    @Mapping(target = "subjectName", source = "subject.name")
    @Mapping(target = "batchId", expression = "java(material.getBatch() != null ? material.getBatch().getId() : null)")
    @Mapping(target = "batchName", expression = "java(material.getBatch() != null ? material.getBatch().getName() : null)")
    StudyMaterialResponse toStudyMaterialResponse(StudyMaterial material);

    @Mapping(target = "subjectName", expression = "java(material.getSubject() != null ? material.getSubject().getName() : null)")
    @Mapping(target = "batchName", expression = "java(material.getBatch() != null ? material.getBatch().getName() : null)")
    StudyMaterialListResponse toStudyMaterialListResponse(StudyMaterial material);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "title", source = "request.title")
    @Mapping(target = "description", source = "request.description")
    @Mapping(target = "fileUrl", source = "request.fileUrl")
    @Mapping(target = "fileType", source = "request.fileType")
    @Mapping(target = "fileSize", source = "request.fileSize")
    @Mapping(target = "publicAccess", source = "request.publicAccess")
    void updateStudyMaterial(StudyMaterialRequest request, @MappingTarget StudyMaterial material);
}