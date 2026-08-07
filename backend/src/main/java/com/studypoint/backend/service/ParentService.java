package com.studypoint.backend.service;

import com.studypoint.backend.dto.request.ParentRequest;
import com.studypoint.backend.dto.response.ParentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ParentService {
    ParentResponse createParent(ParentRequest request);
    ParentResponse updateParent(Long id, ParentRequest request);
    void deleteParent(Long id);
    ParentResponse getParentById(Long id);
    Page<ParentResponse> getAllParents(Pageable pageable);
}
