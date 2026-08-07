package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.AdmissionRequest;
import com.studypoint.backend.dto.response.AdmissionListResponse;
import com.studypoint.backend.dto.response.AdmissionResponse;
import com.studypoint.backend.entity.AdmissionApplication;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface AdmissionMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "applicationNumber", ignore = true)
    @Mapping(target = "course", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "reviewedBy", ignore = true)
    @Mapping(target = "reviewedAt", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    AdmissionApplication toAdmission(AdmissionRequest request);

    @Mapping(target = "courseId", expression = "java(application.getCourse() != null ? application.getCourse().getId() : null)")
    @Mapping(target = "courseName", source = "course.name")
    AdmissionResponse toAdmissionResponse(AdmissionApplication application);

    @Mapping(target = "courseName", source = "course.name")
    AdmissionListResponse toAdmissionListResponse(AdmissionApplication application);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "firstName", source = "request.firstName")
    @Mapping(target = "lastName", source = "request.lastName")
    @Mapping(target = "email", source = "request.email")
    @Mapping(target = "phone", source = "request.phone")
    @Mapping(target = "dateOfBirth", source = "request.dateOfBirth")
    @Mapping(target = "gender", source = "request.gender")
    @Mapping(target = "address", source = "request.address")
    @Mapping(target = "city", source = "request.city")
    @Mapping(target = "state", source = "request.state")
    @Mapping(target = "postalCode", source = "request.postalCode")
    @Mapping(target = "country", source = "request.country")
    @Mapping(target = "previousSchool", source = "request.previousSchool")
    @Mapping(target = "previousGrade", source = "request.previousGrade")
    @Mapping(target = "guardianName", source = "request.guardianName")
    @Mapping(target = "guardianPhone", source = "request.guardianPhone")
    @Mapping(target = "guardianEmail", source = "request.guardianEmail")
    @Mapping(target = "documentsUrl", source = "request.documentsUrl")
    void updateAdmission(AdmissionRequest request, @MappingTarget AdmissionApplication application);
}
