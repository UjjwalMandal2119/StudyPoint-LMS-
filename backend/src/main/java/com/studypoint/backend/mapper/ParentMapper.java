package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.ParentRequest;
import com.studypoint.backend.dto.response.ParentResponse;
import com.studypoint.backend.entity.Parent;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ParentMapper {
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "students", ignore = true)
    Parent toParent(ParentRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateParentFromRequest(ParentRequest request, @MappingTarget Parent parent);

    @Mapping(target = "studentIds", expression = "java(parent.getStudents() != null ? parent.getStudents().stream().map(s -> s.getId()).toList() : null)")
    ParentResponse toParentResponse(Parent parent);
}
