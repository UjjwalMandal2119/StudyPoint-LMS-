package com.studypoint.backend.service.impl;

import com.studypoint.backend.dto.request.BulkQuestionRequest;
import com.studypoint.backend.dto.request.QuestionRequest;
import com.studypoint.backend.dto.response.QuestionListResponse;
import com.studypoint.backend.dto.response.QuestionResponse;
import com.studypoint.backend.entity.Question;
import com.studypoint.backend.entity.Subject;
import com.studypoint.backend.exception.ResourceNotFoundException;
import com.studypoint.backend.mapper.QuestionMapper;
import com.studypoint.backend.repository.QuestionRepository;
import com.studypoint.backend.repository.SubjectRepository;
import com.studypoint.backend.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    private final QuestionMapper questionMapper;
    private final SubjectRepository subjectRepository;

    @Override
    public QuestionResponse createQuestion(QuestionRequest questionRequest) {
        Question question = questionMapper.toQuestion(questionRequest);
        resolveSubject(question, questionRequest.getSubjectId());
        Question savedQuestion = questionRepository.save(question);
        return questionMapper.toQuestionResponse(savedQuestion);
    }

    @Override
    public List<QuestionResponse> createBulkQuestions(BulkQuestionRequest bulkQuestionRequest) {
        return bulkQuestionRequest.getQuestions().stream()
                .map(questionRequest -> {
                    Question question = questionMapper.toQuestion(questionRequest);
                    resolveSubject(question, questionRequest.getSubjectId());
                    return questionRepository.save(question);
                })
                .map(questionMapper::toQuestionResponse)
                .collect(Collectors.toList());
    }

    @Override
    public QuestionResponse updateQuestion(Long id, QuestionRequest questionRequest) {
        Question existingQuestion = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question", "id", id));
        existingQuestion.setQuestionText(questionRequest.getQuestionText());
        existingQuestion.setQuestionType(questionRequest.getQuestionType());
        resolveSubject(existingQuestion, questionRequest.getSubjectId());
        existingQuestion.setOptions(questionRequest.getOptions());
        existingQuestion.setCorrectAnswer(questionRequest.getCorrectAnswer());
        existingQuestion.setExplanation(questionRequest.getExplanation());
        existingQuestion.setMarks(questionRequest.getMarks());
        existingQuestion.setDifficultyLevel(questionRequest.getDifficultyLevel());
        Question updatedQuestion = questionRepository.save(existingQuestion);
        return questionMapper.toQuestionResponse(updatedQuestion);
    }

    private void resolveSubject(Question question, Long subjectId) {
        if (subjectId != null) {
            Subject subject = subjectRepository.findById(subjectId)
                    .orElseThrow(() -> new ResourceNotFoundException("Subject", "id", subjectId));
            question.setSubject(subject);
        }
    }

    @Override
    public void deleteQuestion(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question", "id", id));
        questionRepository.delete(question);
    }

    @Override
    @Transactional(readOnly = true)
    public QuestionResponse getQuestionById(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question", "id", id));
        return questionMapper.toQuestionResponse(question);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<QuestionResponse> getAllQuestions(Pageable pageable) {
        return questionRepository.findAll(pageable).map(questionMapper::toQuestionResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<QuestionResponse> getQuestionsBySubjectId(Long subjectId, Pageable pageable) {
        return questionRepository.findBySubjectId(subjectId, pageable).map(questionMapper::toQuestionResponse);
    }

    @Override
    public QuestionResponse approveQuestion(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question", "id", id));
        question.setApproved(true);
        Question updatedQuestion = questionRepository.save(question);
        return questionMapper.toQuestionResponse(updatedQuestion);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<QuestionResponse> getApprovedQuestionsBySubjectId(Long subjectId, Pageable pageable) {
        return questionRepository.findApprovedBySubjectId(subjectId, pageable).map(questionMapper::toQuestionResponse);
    }
}