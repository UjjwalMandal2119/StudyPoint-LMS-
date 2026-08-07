package com.studypoint.backend.dto.request;

import com.studypoint.backend.constants.GrievanceStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class GrievanceStatusRequest {

    @NotNull(message = "Status is required")
    private GrievanceStatus status;

    @Size(max = 5000, message = "Response must not exceed 5000 characters")
    private String adminResponse;
}
