package com.studypoint.backend.service.impl;

import com.studypoint.backend.constants.DiscussionStatus;
import com.studypoint.backend.dto.request.DiscussionReplyRequest;
import com.studypoint.backend.dto.request.DiscussionRequest;
import com.studypoint.backend.dto.response.DiscussionListResponse;
import com.studypoint.backend.dto.response.DiscussionReplyResponse;
import com.studypoint.backend.dto.response.DiscussionResponse;
import com.studypoint.backend.entity.Discussion;
import com.studypoint.backend.entity.DiscussionReply;
import com.studypoint.backend.entity.User;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.DiscussionMapper;
import com.studypoint.backend.repository.DiscussionReplyRepository;
import com.studypoint.backend.repository.DiscussionRepository;
import com.studypoint.backend.repository.UserRepository;
import com.studypoint.backend.service.DiscussionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DiscussionServiceImpl implements DiscussionService {

    private final DiscussionRepository discussionRepository;
    private final DiscussionReplyRepository replyRepository;
    private final UserRepository userRepository;
    private final DiscussionMapper discussionMapper;

    @Override
    @Transactional
    public DiscussionResponse createDiscussion(DiscussionRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        Discussion discussion = discussionMapper.toDiscussion(request);
        discussion.setUser(user);
        return discussionMapper.toDiscussionResponse(discussionRepository.save(discussion));
    }

    @Override
    @Transactional
    public DiscussionResponse updateDiscussion(Long id, DiscussionRequest request) {
        Discussion discussion = discussionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Discussion", "id", id));
        discussion.setTitle(request.getTitle());
        discussion.setContent(request.getContent());
        if (request.getTag() != null) {
            discussion.setTag(request.getTag());
        }
        return discussionMapper.toDiscussionResponse(discussionRepository.save(discussion));
    }

    @Override
    @Transactional
    public DiscussionResponse getDiscussionById(Long id) {
        Discussion discussion = discussionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Discussion", "id", id));
        discussion.setViewCount(discussion.getViewCount() + 1);
        discussionRepository.save(discussion);
        return discussionMapper.toDiscussionResponse(discussion);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DiscussionListResponse> getAllDiscussions(Pageable pageable) {
        return discussionRepository.findAll(pageable).map(discussionMapper::toDiscussionListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DiscussionListResponse> searchDiscussions(String search, Pageable pageable) {
        return discussionRepository.search(search, pageable).map(discussionMapper::toDiscussionListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DiscussionListResponse> getByUser(Long userId, Pageable pageable) {
        return discussionRepository.findByUserId(userId, pageable).map(discussionMapper::toDiscussionListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DiscussionListResponse> getByStatus(DiscussionStatus status, Pageable pageable) {
        return discussionRepository.findByStatus(status, pageable).map(discussionMapper::toDiscussionListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DiscussionListResponse> getByTag(String tag, Pageable pageable) {
        return discussionRepository.findByTag(tag, pageable).map(discussionMapper::toDiscussionListResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DiscussionListResponse> getPinned(Pageable pageable) {
        return discussionRepository.findByPinnedTrue(pageable).map(discussionMapper::toDiscussionListResponse);
    }

    @Override
    @Transactional
    public DiscussionResponse likeDiscussion(Long id) {
        Discussion discussion = discussionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Discussion", "id", id));
        discussion.setLikeCount(discussion.getLikeCount() + 1);
        return discussionMapper.toDiscussionResponse(discussionRepository.save(discussion));
    }

    @Override
    @Transactional
    public DiscussionResponse setStatus(Long id, DiscussionStatus status) {
        Discussion discussion = discussionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Discussion", "id", id));
        discussion.setStatus(status);
        return discussionMapper.toDiscussionResponse(discussionRepository.save(discussion));
    }

    @Override
    @Transactional
    public DiscussionResponse pinDiscussion(Long id, boolean pinned) {
        Discussion discussion = discussionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Discussion", "id", id));
        discussion.setPinned(pinned);
        if (pinned) {
            discussion.setStatus(DiscussionStatus.PINNED);
        } else if (discussion.getStatus() == DiscussionStatus.PINNED) {
            discussion.setStatus(DiscussionStatus.OPEN);
        }
        return discussionMapper.toDiscussionResponse(discussionRepository.save(discussion));
    }

    @Override
    @Transactional
    public DiscussionResponse reportDiscussion(Long id, String reason) {
        Discussion discussion = discussionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Discussion", "id", id));
        discussion.setReported(true);
        discussion.setReportReason(reason);
        return discussionMapper.toDiscussionResponse(discussionRepository.save(discussion));
    }

    @Override
    @Transactional
    public void deleteDiscussion(Long id) {
        Discussion discussion = discussionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Discussion", "id", id));
        discussion.setActive(false);
        discussionRepository.save(discussion);
    }


    @Override
    @Transactional
    public DiscussionReplyResponse addReply(Long discussionId, DiscussionReplyRequest request, Long userId) {
        Discussion discussion = discussionRepository.findById(discussionId)
                .orElseThrow(() -> new ResourceNotFoundException("Discussion", "id", discussionId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        DiscussionReply reply = new DiscussionReply();
        reply.setDiscussion(discussion);
        reply.setUser(user);
        reply.setContent(request.getContent());

        if (request.getParentReplyId() != null) {
            DiscussionReply parent = replyRepository.findById(request.getParentReplyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Reply", "id", request.getParentReplyId()));
            reply.setParentReply(parent);
        }

        DiscussionReply saved = replyRepository.save(reply);
        discussion.setReplyCount(discussion.getReplyCount() + 1);
        discussionRepository.save(discussion);
        return discussionMapper.toReplyResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DiscussionReplyResponse> getReplies(Long discussionId, Pageable pageable) {
        return replyRepository.findByDiscussionId(discussionId, pageable).map(discussionMapper::toReplyResponse);
    }

    @Override
    @Transactional
    public DiscussionReplyResponse likeReply(Long replyId) {
        DiscussionReply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new ResourceNotFoundException("Reply", "id", replyId));
        reply.setLikeCount(reply.getLikeCount() + 1);
        return discussionMapper.toReplyResponse(replyRepository.save(reply));
    }

    @Override
    @Transactional
    public DiscussionReplyResponse acceptAnswer(Long replyId) {
        DiscussionReply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new ResourceNotFoundException("Reply", "id", replyId));
        reply.setAcceptedAnswer(true);
        Discussion discussion = reply.getDiscussion();
        discussion.setStatus(DiscussionStatus.RESOLVED);
        discussionRepository.save(discussion);
        return discussionMapper.toReplyResponse(replyRepository.save(reply));
    }

    @Override
    @Transactional
    public void deleteReply(Long replyId) {
        DiscussionReply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new ResourceNotFoundException("Reply", "id", replyId));
        Discussion discussion = reply.getDiscussion();
        if (discussion.getReplyCount() > 0) {
            discussion.setReplyCount(discussion.getReplyCount() - 1);
            discussionRepository.save(discussion);
        }
        reply.setActive(false);
        replyRepository.save(reply);
    }

}
