package com.studypoint.backend.service.impl;

import com.studypoint.backend.dto.request.TeacherRequest;
import com.studypoint.backend.dto.response.TeacherListResponse;
import com.studypoint.backend.dto.response.TeacherResponse;
import com.studypoint.backend.entity.Teacher;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.TeacherMapper;
import com.studypoint.backend.repository.TeacherRepository;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {
    private final TeacherRepository teacherRepository;
    private final TeacherMapper teacherMapper;
    private final UserRepository userRepository;

    @Override
    public TeacherResponse createTeacher(TeacherRequest request) {
        if (teacherRepository.existsByEmployeeId(request.getEmployeeId())) {
            throw new IllegalArgumentException("Employee ID already exists");
        }
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUserId()));

        Teacher teacher = teacherMapper.toTeacher(request);
        teacher.setUser(user);
        teacher = teacherRepository.save(teacher);
        return teacherMapper.toTeacherResponse(teacher);
    }

    @Override
    public TeacherResponse updateTeacher(Long id, TeacherRequest request) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", id));

        if (!request.getEmployeeId().equals(teacher.getEmployeeId()) && teacherRepository.existsByEmployeeId(request.getEmployeeId())) {
            throw new IllegalArgumentException("Employee ID already exists");
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUserId()));

        teacherMapper.updateTeacherFromRequest(request, teacher);
        teacher.setUser(user);
        teacher = teacherRepository.save(teacher);
        return teacherMapper.toTeacherResponse(teacher);
    }

    @Override
    public void deleteTeacher(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", id));
        teacher.setActive(false);
        teacherRepository.save(teacher);
    }

    @Override
    public TeacherResponse getTeacherById(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", id));
        return teacherMapper.toTeacherResponse(teacher);
    }

    @Override
    public TeacherResponse getTeacherByUserId(Long userId) {
        Teacher teacher = teacherRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher", "userId", userId));
        return teacherMapper.toTeacherResponse(teacher);
    }

    @Override
    public Page<TeacherListResponse> getAllTeachers(Pageable pageable) {
        return teacherRepository.findAll(pageable)
                .map(teacherMapper::toTeacherListResponse);
    }

    @Override
    public Page<TeacherListResponse> searchTeachers(String search, Pageable pageable) {
        return teacherRepository.search(search, pageable)
                .map(teacherMapper::toTeacherListResponse);
    }
}
