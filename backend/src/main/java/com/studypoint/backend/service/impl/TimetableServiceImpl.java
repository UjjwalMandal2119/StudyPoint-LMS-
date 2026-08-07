package com.studypoint.backend.service.impl;

import com.studypoint.backend.dto.request.TimetableRequest;
import com.studypoint.backend.dto.response.TimetableListResponse;
import com.studypoint.backend.dto.response.TimetableResponse;
import com.studypoint.backend.entity.Batch;
import com.studypoint.backend.entity.Subject;
import com.studypoint.backend.entity.Teacher;
import com.studypoint.backend.entity.Timetable;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.TimetableMapper;
import com.studypoint.backend.repository.BatchRepository;
import com.studypoint.backend.repository.SubjectRepository;
import com.studypoint.backend.repository.TeacherRepository;
import com.studypoint.backend.repository.TimetableRepository;
import com.studypoint.backend.service.TimetableService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TimetableServiceImpl implements TimetableService {

    private final TimetableRepository timetableRepository;
    private final TimetableMapper timetableMapper;
    private final BatchRepository batchRepository;
    private final SubjectRepository subjectRepository;
    private final TeacherRepository teacherRepository;

    @Override
    public TimetableResponse createTimetable(TimetableRequest request) {
        Timetable timetable = timetableMapper.toTimetable(request);
        setTimetableRelations(timetable, request);
        Timetable saved = timetableRepository.save(timetable);
        return timetableMapper.toTimetableResponse(saved);
    }

    @Override
    public TimetableResponse updateTimetable(Long id, TimetableRequest request) {
        Timetable timetable = timetableRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Timetable", "id", id));
        timetableMapper.updateTimetable(request, timetable);
        setTimetableRelations(timetable, request);
        Timetable saved = timetableRepository.save(timetable);
        return timetableMapper.toTimetableResponse(saved);
    }

    @Override
    public void deleteTimetable(Long id) {
        Timetable timetable = timetableRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Timetable", "id", id));
        timetable.setActive(false);
        timetableRepository.save(timetable);
    }

    @Override
    public List<TimetableListResponse> getTimetableByBatchId(Long batchId) {
        return timetableRepository.findByBatchId(batchId, Pageable.unpaged()).stream()
                .map(timetableMapper::toTimetableListResponse)
                .toList();
    }

    @Override
    public List<TimetableListResponse> getTimetableByBatchAndDay(Long batchId, DayOfWeek dayOfWeek) {
        return timetableRepository.findByBatchIdAndDayOfWeek(batchId, dayOfWeek, Pageable.unpaged()).stream()
                .map(timetableMapper::toTimetableListResponse)
                .toList();
    }

    @Override
    public TimetableResponse toggleActive(Long id) {
        Timetable timetable = timetableRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Timetable", "id", id));
        timetable.setActive(!timetable.isActive());
        Timetable saved = timetableRepository.save(timetable);
        return timetableMapper.toTimetableResponse(saved);
    }

    private void setTimetableRelations(Timetable timetable, TimetableRequest request) {
        if (request.getBatchId() != null) {
            Batch batch = batchRepository.findById(request.getBatchId())
                    .orElseThrow(() -> new ResourceNotFoundException("Batch", "id", request.getBatchId()));
            timetable.setBatch(batch);
        }
        if (request.getSubjectId() != null) {
            Subject subject = subjectRepository.findById(request.getSubjectId())
                    .orElseThrow(() -> new ResourceNotFoundException("Subject", "id", request.getSubjectId()));
            timetable.setSubject(subject);
        }
        if (request.getTeacherId() != null) {
            Teacher teacher = teacherRepository.findById(request.getTeacherId())
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher", "id", request.getTeacherId()));
            timetable.setTeacher(teacher);
        }
    }
}