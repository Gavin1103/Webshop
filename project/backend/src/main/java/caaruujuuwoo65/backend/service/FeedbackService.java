package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.CreateFeedbackDTO;
import caaruujuuwoo65.backend.model.Feedback;
import caaruujuuwoo65.backend.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    @Autowired
    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public void saveFeedbackRecord(CreateFeedbackDTO feedbackDTO) {
        Feedback feedback = new Feedback();
        feedback.setFeedbackId(feedbackDTO.getFeedbackId());
        feedback.setImage(feedbackDTO.getImage());
        feedback.setFeedback(feedbackDTO.getFeedback());
        feedback.setCreatedAt(feedbackDTO.getCreatedAt() != null ? feedbackDTO.getCreatedAt() : LocalDateTime.now());
        feedbackRepository.save(feedback);
    }
}
