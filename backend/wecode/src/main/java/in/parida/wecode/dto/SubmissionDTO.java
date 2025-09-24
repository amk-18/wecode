package in.parida.wecode.dto;

import in.parida.wecode.model.Submission;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SubmissionDTO {
    private Long id;
    private Long userId;
    private Long problemId;
    private String problemTitle;
    private String code;
    private String language;
    private Submission.SubmissionStatus status;
    private Integer executionTime;
    private Integer memoryUsed;
    private Integer testCasesPassed;
    private Integer totalTestCases;
    private LocalDateTime submittedAt;

    public SubmissionDTO(Submission submission) {
        this.id = submission.getId();
        this.userId = submission.getUser().getId();
        this.problemId = submission.getProblem().getId();
        this.problemTitle = submission.getProblem().getTitle();
        this.code = submission.getCode();
        this.language = submission.getLanguage();
        this.status = submission.getStatus();
        this.executionTime = submission.getExecutionTime();
        this.memoryUsed = submission.getMemoryUsed();
        this.testCasesPassed = submission.getTestCasesPassed();
        this.totalTestCases = submission.getTotalTestCases();
        this.submittedAt = submission.getSubmittedAt();
    }
}