package com.studypoint.backend.mapper;

import com.studypoint.backend.constants.GrievanceStatus;
import com.studypoint.backend.dto.request.GrievanceRequest;
import com.studypoint.backend.dto.response.GrievanceListResponse;
import com.studypoint.backend.dto.response.GrievanceResponse;
import com.studypoint.backend.entity.Grievance;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-08-07T20:05:41+0530",
    comments = "version: 1.6.2, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class GrievanceMapperImpl implements GrievanceMapper {

    @Override
    public Grievance toGrievance(GrievanceRequest request) {
        if ( request == null ) {
            return null;
        }

        Grievance grievance = new Grievance();

        grievance.setCategory( request.getCategory() );
        grievance.setDescription( request.getDescription() );
        grievance.setTitle( request.getTitle() );

        return grievance;
    }

    @Override
    public GrievanceResponse toGrievanceResponse(Grievance grievance) {
        if ( grievance == null ) {
            return null;
        }

        String adminResponse = null;
        String category = null;
        LocalDateTime createdAt = null;
        String description = null;
        Long id = null;
        LocalDateTime resolvedAt = null;
        Long resolvedBy = null;
        GrievanceStatus status = null;
        String title = null;
        String trackingNumber = null;
        LocalDateTime updatedAt = null;

        adminResponse = grievance.getAdminResponse();
        category = grievance.getCategory();
        createdAt = grievance.getCreatedAt();
        description = grievance.getDescription();
        id = grievance.getId();
        resolvedAt = grievance.getResolvedAt();
        resolvedBy = grievance.getResolvedBy();
        status = grievance.getStatus();
        title = grievance.getTitle();
        trackingNumber = grievance.getTrackingNumber();
        updatedAt = grievance.getUpdatedAt();

        Long userId = grievance.getUser() != null ? grievance.getUser().getId() : null;
        String userName = grievance.getUser() != null ? grievance.getUser().getFirstName() + ' ' + grievance.getUser().getLastName() : null;

        GrievanceResponse grievanceResponse = new GrievanceResponse( id, trackingNumber, title, description, category, userId, userName, status, adminResponse, resolvedBy, resolvedAt, createdAt, updatedAt );

        return grievanceResponse;
    }

    @Override
    public GrievanceListResponse toGrievanceListResponse(Grievance grievance) {
        if ( grievance == null ) {
            return null;
        }

        String category = null;
        LocalDateTime createdAt = null;
        Long id = null;
        GrievanceStatus status = null;
        String title = null;
        String trackingNumber = null;

        category = grievance.getCategory();
        createdAt = grievance.getCreatedAt();
        id = grievance.getId();
        status = grievance.getStatus();
        title = grievance.getTitle();
        trackingNumber = grievance.getTrackingNumber();

        String userName = grievance.getUser() != null ? grievance.getUser().getFirstName() + ' ' + grievance.getUser().getLastName() : null;

        GrievanceListResponse grievanceListResponse = new GrievanceListResponse( id, trackingNumber, title, category, userName, status, createdAt );

        return grievanceListResponse;
    }
}
