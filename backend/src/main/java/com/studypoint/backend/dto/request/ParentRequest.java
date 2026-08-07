package com.studypoint.backend.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParentRequest {
    private Long userId;

    @NotEmpty(message = "At least one student is required")
    private List<Long> studentIds;

    @Size(max = 100, message = "Occupation must not exceed 100 characters")
    private String occupation;

    private BigDecimal annualIncome;

    @Size(max = 20, message = "Alternate phone must not exceed 20 characters")
    private String alternatePhone;

    @NotNull(message = "Primary guardian status is required")
    private Boolean primaryGuardian;
}
