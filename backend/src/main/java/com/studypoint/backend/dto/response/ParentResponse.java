package com.studypoint.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParentResponse {
    private Long id;
    private Long userId;
    private UserResponse user;
    private List<Long> studentIds;
    private String occupation;
    private BigDecimal annualIncome;
    private String alternatePhone;
    private Boolean primaryGuardian;
    private Boolean active;
    private LocalDateTime createdAt;
}
