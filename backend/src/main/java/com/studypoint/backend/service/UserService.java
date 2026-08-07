package com.studypoint.backend.service;

import com.studypoint.backend.constants.Role;
import com.studypoint.backend.dto.request.UserRequest;
import com.studypoint.backend.dto.response.UserListResponse;
import com.studypoint.backend.dto.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    Page<UserListResponse> getAllUsers(Pageable pageable);

    UserResponse getUserById(Long id);

    UserResponse getUserByUsername(String username);

    UserResponse updateUser(Long id, UserRequest request);

    void deleteUser(Long id);

    Page<UserListResponse> searchUsers(String search, Pageable pageable);

    long getUserCountByRole(Role role);

    UserResponse lockUser(Long id);

    UserResponse unlockUser(Long id);
}