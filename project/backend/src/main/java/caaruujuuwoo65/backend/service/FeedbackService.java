package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.model.Feedback;
import caaruujuuwoo65.backend.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    @Autowired
    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public void saveFeedbackRecord(Long feedbackId, MultipartFile image, String feedback, LocalDateTime createdAt) throws IOException {
        Feedback feedbackRecord = new Feedback();
        feedbackRecord.setFeedbackId(feedbackId);
        feedbackRecord.setImage(image.getBytes());
        feedbackRecord.setFeedback(feedback);
        feedbackRecord.setCreatedAt(createdAt);

        feedbackRepository.save(feedbackRecord);
    }
}
