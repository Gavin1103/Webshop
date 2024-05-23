package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.service.FeedbackService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping("/")
    @Operation(summary = "Create a feedback record", description = "Create a feedback record in the database!")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Feedback created successfully"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<?> saveFeedbackRecord(
        @RequestParam("id") Long feedbackId,
        @RequestParam("image") MultipartFile image,
        @RequestParam("feedback") String feedback,
        @RequestParam("createdAt") String createdAt) {
        try {
            feedbackService.saveFeedbackRecord(feedbackId, image, feedback, LocalDateTime.parse(createdAt));
            return ResponseEntity.ok().body("Feedback record saved successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to save feedback record");
        }
    }
}
