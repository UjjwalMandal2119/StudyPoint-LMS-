package com.studypoint.backend.mapper;

import com.studypoint.backend.dto.request.NoticeRequest;
import com.studypoint.backend.dto.response.NoticeListResponse;
import com.studypoint.backend.dto.response.NoticeResponse;
import com.studypoint.backend.entity.Notice;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface NoticeMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "publishedBy", ignore = true)
    @Mapping(target = "published", ignore = true)
    @Mapping(target = "publishedAt", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Notice toNotice(NoticeRequest request);

    NoticeResponse toNoticeResponse(Notice notice);

    NoticeListResponse toNoticeListResponse(Notice notice);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "title", source = "request.title")
    @Mapping(target = "content", source = "request.content")
    @Mapping(target = "publishDate", source = "request.publishDate")
    @Mapping(target = "expiryDate", source = "request.expiryDate")
    @Mapping(target = "important", source = "request.important")
    @Mapping(target = "attachmentUrl", source = "request.attachmentUrl")
    void updateNotice(NoticeRequest request, @MappingTarget Notice notice);
}
