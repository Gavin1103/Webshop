package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.CreateFeedbackDTO;
import caaruujuuwoo65.backend.model.Feedback;
import caaruujuuwoo65.backend.service.FeedbackService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<?> saveFeedbackRecord(@RequestBody CreateFeedbackDTO feedbackDTO) {
        try {
            feedbackService.saveFeedbackRecord(feedbackDTO);
            return ResponseEntity.ok().body("Feedback record saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to save feedback record");
        }
    }

    @GetMapping("/")
    @Operation(summary = "Get all feedback records", description = "Get all feedback records from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Feedback records retrieved successfully"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        try {
            List<Feedback> feedbackList = feedbackService.getAllFeedback();
            return ResponseEntity.ok(feedbackList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
