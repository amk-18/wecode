package in.parida.wecode.controller;

import in.parida.wecode.dto.CodeSubmissionDTO;
import in.parida.wecode.dto.SubmissionDTO;
import in.parida.wecode.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "*")
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    @PostMapping("/submit")
    public ResponseEntity<SubmissionDTO> submitCode(@RequestBody CodeSubmissionDTO submissionDTO) {
        // For demo, using user ID 1. In real app, get from authentication
        Long userId = 1L;
        SubmissionDTO submission = submissionService.createSubmission(
                userId,
                submissionDTO.getProblemId(),
                submissionDTO.getCode(),
                submissionDTO.getLanguage()
        );
        return ResponseEntity.ok(submission);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SubmissionDTO>> getUserSubmissions(@PathVariable Long userId) {
        List<SubmissionDTO> submissions = submissionService.getUserSubmissions(userId);
        return ResponseEntity.ok(submissions);
    }

    @GetMapping("/problem/{problemId}")
    public ResponseEntity<List<SubmissionDTO>> getProblemSubmissions(@PathVariable Long problemId) {
        List<SubmissionDTO> submissions = submissionService.getProblemSubmissions(problemId);
        return ResponseEntity.ok(submissions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubmissionDTO> getSubmissionById(@PathVariable Long id) {
        SubmissionDTO submission = submissionService.getSubmissionById(id);
        return ResponseEntity.ok(submission);
    }
}