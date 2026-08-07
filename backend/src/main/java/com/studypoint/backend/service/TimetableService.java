package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.TimetableRequest;
import com.studypoint.backend.dto.response.TimetableListResponse;
import com.studypoint.backend.dto.response.TimetableResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.DayOfWeek;
import java.util.List;

public interface TimetableService {

    TimetableResponse createTimetable(TimetableRequest request);

    TimetableResponse updateTimetable(Long id, TimetableRequest request);

    void deleteTimetable(Long id);

    List<TimetableListResponse> getTimetableByBatchId(Long batchId);

    List<TimetableListResponse> getTimetableByBatchAndDay(Long batchId, DayOfWeek dayOfWeek);

    TimetableResponse toggleActive(Long id);
}