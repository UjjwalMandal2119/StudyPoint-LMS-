package com.studypoint.backend.service.impl;

import com.studypoint.backend.dto.request.ParentRequest;
import com.studypoint.backend.dto.response.ParentResponse;
import com.studypoint.backend.entity.Parent;
import com.studypoint.backend.entity.Student;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.ParentMapper;
import com.studypoint.backend.repository.ParentRepository;
import com.studypoint.backend.repository.StudentRepository;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ParentServiceImpl implements ParentService {
    private final ParentRepository parentRepository;
    private final ParentMapper parentMapper;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;

    @Override
    public ParentResponse createParent(ParentRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUserId()));
        Set<Student> students = new HashSet<>(studentRepository.findAllById(request.getStudentIds()));

        Parent parent = parentMapper.toParent(request);
        parent.setUser(user);
        parent.setStudents(students);
        parent = parentRepository.save(parent);
        return parentMapper.toParentResponse(parent);
    }

    @Override
    public ParentResponse updateParent(Long id, ParentRequest request) {
        Parent parent = parentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parent", "id", id));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUserId()));
        Set<Student> students = new HashSet<>(studentRepository.findAllById(request.getStudentIds()));

        parentMapper.updateParentFromRequest(request, parent);
        parent.setUser(user);
        parent.setStudents(students);
        parent = parentRepository.save(parent);
        return parentMapper.toParentResponse(parent);
    }

    @Override
    public void deleteParent(Long id) {
        Parent parent = parentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parent", "id", id));
        parent.setActive(false);
        parentRepository.save(parent);
    }

    @Override
    public ParentResponse getParentById(Long id) {
        Parent parent = parentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parent", "id", id));
        return parentMapper.toParentResponse(parent);
    }

    @Override
    public Page<ParentResponse> getAllParents(Pageable pageable) {
        return parentRepository.findAll(pageable)
                .map(parentMapper::toParentResponse);
    }
}
