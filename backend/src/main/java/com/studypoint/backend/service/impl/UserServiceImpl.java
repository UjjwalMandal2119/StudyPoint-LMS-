package com.studypoint.backend.service.impl;

import com.studypoint.backend.constants.Role;
import com.studypoint.backend.dto.request.UserRequest;
import com.studypoint.backend.dto.response.UserListResponse;
import com.studypoint.backend.dto.response.UserResponse;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.UserMapper;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    @Transactional(readOnly = true)
    public Page<UserListResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map(userMapper::toUserListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return userMapper.toUserResponse(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        return userMapper.toUserResponse(user);
    }

    @Override
    @Transactional
    public UserResponse updateUser(Long id, UserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        userMapper.updateUser(request, user);
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        userRepository.delete(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserListResponse> searchUsers(String search, Pageable pageable) {
        return userRepository.search(search, pageable).map(userMapper::toUserListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public long getUserCountByRole(Role role) {
        return userRepository.countByRole(role);
    }

    @Override
    @Transactional
    public UserResponse lockUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        user.setLocked(true);
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    @Override
    @Transactional
    public UserResponse unlockUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        user.setLocked(false);
        user.setFailedAttempts(0);
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }
}