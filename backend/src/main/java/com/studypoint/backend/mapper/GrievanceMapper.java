package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.GrievanceRequest;
import com.studypoint.backend.dto.response.GrievanceListResponse;
import com.studypoint.backend.dto.response.GrievanceResponse;
import com.studypoint.backend.entity.Grievance;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface GrievanceMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "trackingNumber", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "adminResponse", ignore = true)
    @Mapping(target = "resolvedBy", ignore = true)
    @Mapping(target = "resolvedAt", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Grievance toGrievance(GrievanceRequest request);

    @Mapping(target = "userId", expression = "java(grievance.getUser() != null ? grievance.getUser().getId() : null)")
    @Mapping(target = "userName", expression = "java(grievance.getUser() != null ? grievance.getUser().getFirstName() + ' ' + grievance.getUser().getLastName() : null)")
    GrievanceResponse toGrievanceResponse(Grievance grievance);

    @Mapping(target = "userName", expression = "java(grievance.getUser() != null ? grievance.getUser().getFirstName() + ' ' + grievance.getUser().getLastName() : null)")
    GrievanceListResponse toGrievanceListResponse(Grievance grievance);
}
