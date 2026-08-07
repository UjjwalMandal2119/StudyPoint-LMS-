package com.studypoint.backend.controller;

import com.studypoint.backend.constants.Role;
import com.studypoint.backend.dto.request.UserRequest;
import com.studypoint.backend.dto.response.UserListResponse;
import com.studypoint.backend.dto.response.UserResponse;
import com.studypoint.backend.response.ApiResponse;
import com.studypoint.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllUsers(Pageable pageable) {
        Page<UserListResponse> users = userService.getAllUsers(pageable);
        return ResponseEntity.ok(ApiResponse.success(users, "Users retrieved successfully", HttpStatus.OK.value()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getUserById(@PathVariable Long id) {
        UserResponse user = userService.getUserById(id);
        return ResponseEntity.ok(ApiResponse.success(user, "User retrieved successfully", HttpStatus.OK.value()));
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<ApiResponse<?>> getUserByUsername(@PathVariable String username) {
        UserResponse user = userService.getUserByUsername(username);
        return ResponseEntity.ok(ApiResponse.success(user, "User retrieved successfully", HttpStatus.OK.value()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateUser(@PathVariable Long id, @Valid @RequestBody UserRequest request) {
        UserResponse user = userService.updateUser(id, request);
        return ResponseEntity.ok(ApiResponse.success(user, "User updated successfully", HttpStatus.OK.value()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.success("User deleted successfully", HttpStatus.OK.value()));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<?>> searchUsers(@RequestParam String search, Pageable pageable) {
        Page<UserListResponse> users = userService.searchUsers(search, pageable);
        return ResponseEntity.ok(ApiResponse.success(users, "Users found", HttpStatus.OK.value()));
    }

    @GetMapping("/count/role/{role}")
    public ResponseEntity<ApiResponse<?>> getUserCountByRole(@PathVariable Role role) {
        long count = userService.getUserCountByRole(role);
        return ResponseEntity.ok(ApiResponse.success(count, "User count retrieved", HttpStatus.OK.value()));
    }

    @PostMapping("/{id}/lock")
    public ResponseEntity<ApiResponse<?>> lockUser(@PathVariable Long id) {
        UserResponse user = userService.lockUser(id);
        return ResponseEntity.ok(ApiResponse.success(user, "User locked", HttpStatus.OK.value()));
    }

    @PostMapping("/{id}/unlock")
    public ResponseEntity<ApiResponse<?>> unlockUser(@PathVariable Long id) {
        UserResponse user = userService.unlockUser(id);
        return ResponseEntity.ok(ApiResponse.success(user, "User unlocked", HttpStatus.OK.value()));
    }
}