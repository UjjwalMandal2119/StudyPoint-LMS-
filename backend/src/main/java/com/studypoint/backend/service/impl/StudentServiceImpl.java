package com.studypoint.backend.service.impl;

import com.studypoint.backend.dto.request.StudentRequest;
import com.studypoint.backend.dto.response.StudentListResponse;
import com.studypoint.backend.dto.response.StudentResponse;
import com.studypoint.backend.entity.Batch;
import com.studypoint.backend.entity.Student;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.StudentMapper;
import com.studypoint.backend.repository.BatchRepository;
import com.studypoint.backend.repository.StudentRepository;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;
    private final UserRepository userRepository;
    private final BatchRepository batchRepository;

    @Override
    public StudentResponse createStudent(StudentRequest request) {
        if (studentRepository.existsByRollNumber(request.getRollNumber())) {
            throw new IllegalArgumentException("Roll number already exists");
        }
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUserId()));
        Batch batch = request.getBatchId() != null ? batchRepository.findById(request.getBatchId()).orElse(null) : null;

        Student student = studentMapper.toStudent(request);
        student.setUser(user);
        student.setBatch(batch);
        student = studentRepository.save(student);
        return studentMapper.toStudentResponse(student);
    }

    @Override
    public StudentResponse updateStudent(Long id, StudentRequest request) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));

        if (!request.getRollNumber().equals(student.getRollNumber()) && studentRepository.existsByRollNumber(request.getRollNumber())) {
            throw new IllegalArgumentException("Roll number already exists");
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUserId()));
        Batch batch = request.getBatchId() != null ? batchRepository.findById(request.getBatchId()).orElse(null) : null;

        studentMapper.updateStudentFromRequest(request, student);
        student.setUser(user);
        student.setBatch(batch);
        student = studentRepository.save(student);
        return studentMapper.toStudentResponse(student);
    }

    @Override
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));
        student.setActive(false);
        studentRepository.save(student);
    }

    @Override
    public StudentResponse getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));
        return studentMapper.toStudentResponse(student);
    }

    @Override
    public StudentResponse getStudentByUserId(Long userId) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "userId", userId));
        return studentMapper.toStudentResponse(student);
    }

    @Override
    public java.util.List<StudentListResponse> getStudentsByBatchId(Long batchId) {
        return studentRepository.findByBatchId(batchId).stream()
                .map(studentMapper::toStudentListResponse)
                .toList();
    }

    @Override
    public Page<StudentListResponse> getAllStudents(Pageable pageable) {
        return studentRepository.findAll(pageable)
                .map(studentMapper::toStudentListResponse);
    }

    @Override
    public Page<StudentListResponse> searchStudents(String search, Pageable pageable) {
        return studentRepository.search(search, pageable)
                .map(studentMapper::toStudentListResponse);
    }
}
