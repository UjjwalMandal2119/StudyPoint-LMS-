package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.UserRequest;
import com.studypoint.backend.dto.response.UserListResponse;
import com.studypoint.backend.dto.response.UserResponse;
import com.studypoint.backend.entity.User;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserRequest request);

    UserResponse toUserResponse(User user);

    UserListResponse toUserListResponse(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUser(UserRequest request, @MappingTarget User user);
}