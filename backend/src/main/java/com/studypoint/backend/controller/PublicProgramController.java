package com.studypoint.backend.controller;

import com.studypoint.backend.dto.response.ApiResponse;
import com.studypoint.backend.dto.response.PublicProgramResponse;
import com.studypoint.backend.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/public/programs")
@RequiredArgsConstructor
public class PublicProgramController {

    private final CourseService courseService;

    @GetMapping
    public ApiResponse<List<PublicProgramResponse>> getPublicPrograms() {
        return ApiResponse.success(courseService.getPublicPrograms(), 200);
    }
}
