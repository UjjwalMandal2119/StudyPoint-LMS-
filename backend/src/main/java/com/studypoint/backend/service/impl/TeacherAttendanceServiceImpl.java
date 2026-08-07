package com.studypoint.backend.service.impl;

import com.studypoint.backend.constants.AttendanceStatus;
import com.studypoint.backend.dto.request.TeacherAttendanceRequest;
import com.studypoint.backend.dto.response.TeacherAttendanceResponse;
import com.studypoint.backend.entity.Teacher;
import com.studypoint.backend.entity.TeacherAttendance;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.TeacherAttendanceMapper;
import com.studypoint.backend.repository.TeacherAttendanceRepository;
import com.studypoint.backend.repository.TeacherRepository;
import com.studypoint.backend.service.TeacherAttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeacherAttendanceServiceImpl implements TeacherAttendanceService {
    private final TeacherAttendanceRepository teacherAttendanceRepository;
    private final TeacherAttendanceMapper teacherAttendanceMapper;
    private final TeacherRepository teacherRepository;

    @Override
    public TeacherAttendanceResponse markTeacherAttendance(TeacherAttendanceRequest request) {
        Teacher teacher = teacherRepository.findById(request.getTeacherId())
                .orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", request.getTeacherId()));

        TeacherAttendance teacherAttendance = teacherAttendanceRepository.findByTeacherIdAndAttendanceDate(request.getTeacherId(), request.getAttendanceDate())
                .orElseGet(() -> {
                    TeacherAttendance newRecord = teacherAttendanceMapper.toTeacherAttendance(request);
                    newRecord.setTeacher(teacher);
                    return newRecord;
                });

        teacherAttendance.setStatus(request.getStatus());
        teacherAttendance.setCheckInTime(request.getCheckInTime());
        teacherAttendance.setCheckOutTime(request.getCheckOutTime());
        teacherAttendance.setRemarks(request.getRemarks());
        teacherAttendance = teacherAttendanceRepository.save(teacherAttendance);
        return teacherAttendanceMapper.toTeacherAttendanceResponse(teacherAttendance);
    }

    @Override
    public List<TeacherAttendanceResponse> getTeacherAttendanceByTeacherId(Long teacherId, LocalDate startDate, LocalDate endDate) {
        return teacherAttendanceRepository.findByTeacherIdAndAttendanceDateBetween(teacherId, startDate, endDate, org.springframework.data.domain.PageRequest.of(0, Integer.MAX_VALUE))
                .getContent().stream()
                .map(teacherAttendanceMapper::toTeacherAttendanceResponse)
                .collect(Collectors.toList());
    }
}
