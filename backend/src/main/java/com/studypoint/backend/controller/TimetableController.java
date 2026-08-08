package com.studypoint.backend.controller;

import com.studypoint.backend.dto.request.TimetableRequest;
import com.studypoint.backend.dto.response.TimetableListResponse;
import com.studypoint.backend.dto.response.TimetableResponse;
import com.studypoint.backend.dto.response.ApiResponse;
import com.studypoint.backend.service.TimetableService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.util.List;

@RestController
@RequestMapping("/timetable")
@RequiredArgsConstructor
public class TimetableController {

    private final TimetableService timetableService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<TimetableResponse> createTimetable(@Valid @RequestBody TimetableRequest request) {
        TimetableResponse response = timetableService.createTimetable(request);
        return ApiResponse.success(response, "Timetable entry created successfully", HttpStatus.CREATED.value());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<TimetableResponse> updateTimetable(@PathVariable Long id, @Valid @RequestBody TimetableRequest request) {
        TimetableResponse response = timetableService.updateTimetable(id, request);
        return ApiResponse.success(response, "Timetable entry updated successfully", HttpStatus.OK.value());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<String> deleteTimetable(@PathVariable Long id) {
        timetableService.deleteTimetable(id);
        return ApiResponse.success("Timetable entry deleted successfully", HttpStatus.OK.value());
    }

    @GetMapping("/batch/{batchId}")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<List<TimetableListResponse>> getTimetableByBatchId(@PathVariable Long batchId) {
        List<TimetableListResponse> entries = timetableService.getTimetableByBatchId(batchId);
        return ApiResponse.success(entries, HttpStatus.OK.value());
    }

    @GetMapping("/batch/{batchId}/day/{day}")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<List<TimetableListResponse>> getTimetableByBatchAndDay(@PathVariable Long batchId, @PathVariable DayOfWeek day) {
        List<TimetableListResponse> entries = timetableService.getTimetableByBatchAndDay(batchId, day);
        return ApiResponse.success(entries, HttpStatus.OK.value());
    }

    @PatchMapping("/{id}/toggle-active")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ApiResponse<TimetableResponse> toggleActive(@PathVariable Long id) {
        TimetableResponse entry = timetableService.toggleActive(id);
        return ApiResponse.success(entry, "Timetable entry status toggled successfully", HttpStatus.OK.value());
    }
}
