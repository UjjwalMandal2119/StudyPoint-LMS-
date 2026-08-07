package com.studypoint.backend.service.impl;

import com.studypoint.backend.constants.AttendanceStatus;
import com.studypoint.backend.dto.request.AttendanceRequest;
import com.studypoint.backend.dto.request.BulkAttendanceRequest;
import com.studypoint.backend.dto.response.AttendanceResponse;
import com.studypoint.backend.dto.response.AttendanceSummaryResponse;
import com.studypoint.backend.entity.Attendance;
import com.studypoint.backend.entity.Batch;
import com.studypoint.backend.entity.Student;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.AttendanceMapper;
import com.studypoint.backend.repository.AttendanceRepository;
import com.studypoint.backend.repository.BatchRepository;
import com.studypoint.backend.repository.StudentRepository;
import com.studypoint.backend.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final AttendanceMapper attendanceMapper;
    private final StudentRepository studentRepository;
    private final BatchRepository batchRepository;

    @Override
    public AttendanceResponse markAttendance(AttendanceRequest request) {
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", request.getStudentId()));
        Batch batch = batchRepository.findById(request.getBatchId())
                .orElseThrow(() -> new ResourceNotFoundException("Batch", "id", request.getBatchId()));

        Attendance attendance = attendanceRepository.findByStudentIdAndAttendanceDate(request.getStudentId(), request.getAttendanceDate())
                .orElseGet(() -> {
                    Attendance newAttendance = attendanceMapper.toAttendance(request);
                    newAttendance.setStudent(student);
                    newAttendance.setBatch(batch);
                    return newAttendance;
                });

        attendance.setStatus(request.getStatus());
        attendance.setRemarks(request.getRemarks());
        attendance = attendanceRepository.save(attendance);
        return attendanceMapper.toAttendanceResponse(attendance);
    }

    @Override
    public List<AttendanceResponse> markBulkAttendance(BulkAttendanceRequest request) {
        Batch batch = batchRepository.findById(request.getBatchId())
                .orElseThrow(() -> new ResourceNotFoundException("Batch", "id", request.getBatchId()));

        List<AttendanceResponse> responses = new ArrayList<>();
        for (AttendanceRequest attendanceRequest : request.getAttendances()) {
            Student student = studentRepository.findById(attendanceRequest.getStudentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Student", "id", attendanceRequest.getStudentId()));

            Attendance attendance = attendanceRepository.findByStudentIdAndAttendanceDate(attendanceRequest.getStudentId(), request.getAttendanceDate())
                    .orElseGet(() -> {
                        Attendance newAttendance = attendanceMapper.toAttendance(attendanceRequest);
                        newAttendance.setStudent(student);
                        newAttendance.setBatch(batch);
                        newAttendance.setAttendanceDate(request.getAttendanceDate());
                        return newAttendance;
                    });

            attendance.setStatus(attendanceRequest.getStatus());
            attendance.setRemarks(attendanceRequest.getRemarks());
            attendance = attendanceRepository.save(attendance);
            responses.add(attendanceMapper.toAttendanceResponse(attendance));
        }
        return responses;
    }

    @Override
    public List<AttendanceResponse> getAttendanceByStudentId(Long studentId, LocalDate startDate, LocalDate endDate) {
        return attendanceRepository.findByStudentIdAndDateBetween(studentId, startDate, endDate).stream()
                .map(attendanceMapper::toAttendanceResponse)
                .toList();
    }

    @Override
    public List<AttendanceResponse> getAttendanceByBatchId(Long batchId, LocalDate attendanceDate) {
        return attendanceRepository.findByBatchIdAndAttendanceDate(batchId, attendanceDate).stream()
                .map(attendanceMapper::toAttendanceResponse)
                .toList();
    }

    @Override
    public AttendanceSummaryResponse getAttendanceSummary(Long studentId, LocalDate startDate, LocalDate endDate) {
        List<Attendance> attendances = attendanceRepository.findByStudentIdAndDateBetween(studentId, startDate, endDate);

        long totalDays = attendances.size();
        long presentDays = attendances.stream().filter(a -> a.getStatus() == AttendanceStatus.PRESENT).count();
        long absentDays = attendances.stream().filter(a -> a.getStatus() == AttendanceStatus.ABSENT).count();
        long lateDays = attendances.stream().filter(a -> a.getStatus() == AttendanceStatus.LATE).count();
        double percentage = totalDays > 0 ? (presentDays * 100.0) / totalDays : 0.0;

        return attendanceMapper.toAttendanceSummaryResponse(totalDays, presentDays, absentDays, lateDays, percentage);
    }
}
