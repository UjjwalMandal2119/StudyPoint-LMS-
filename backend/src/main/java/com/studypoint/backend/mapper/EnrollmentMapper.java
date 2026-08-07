package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.EnrollmentRequest;
import com.studypoint.backend.dto.response.EnrollmentListResponse;
import com.studypoint.backend.dto.response.EnrollmentResponse;
import com.studypoint.backend.entity.Enrollment;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface EnrollmentMapper {
    @Mapping(target = "student", ignore = true)
    @Mapping(target = "batch", ignore = true)
    Enrollment toEnrollment(EnrollmentRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEnrollmentFromRequest(EnrollmentRequest request, @MappingTarget Enrollment enrollment);

    @Mapping(target = "studentName", expression = "java(enrollment.getStudent() != null && enrollment.getStudent().getUser() != null ? enrollment.getStudent().getUser().getFirstName() + \" \" + enrollment.getStudent().getUser().getLastName() : null)")
    @Mapping(target = "batchName", expression = "java(enrollment.getBatch() != null ? enrollment.getBatch().getName() : null)")
    EnrollmentResponse toEnrollmentResponse(Enrollment enrollment);

    @Mapping(target = "studentName", expression = "java(enrollment.getStudent() != null && enrollment.getStudent().getUser() != null ? enrollment.getStudent().getUser().getFirstName() + \" \" + enrollment.getStudent().getUser().getLastName() : null)")
    @Mapping(target = "batchName", expression = "java(enrollment.getBatch() != null ? enrollment.getBatch().getName() : null)")
    EnrollmentListResponse toEnrollmentListResponse(Enrollment enrollment);
}
