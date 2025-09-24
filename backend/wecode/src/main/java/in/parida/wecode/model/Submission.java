package in.parida.wecode.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")
@Data
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id", nullable = false)
    private Problem problem;

    @Lob
    @Column(nullable = false)
    private String code;

    @Column(nullable = false, length = 20)
    private String language;

    @Enumerated(EnumType.STRING)
    private SubmissionStatus status = SubmissionStatus.PENDING;

    private Integer executionTime;
    private Integer memoryUsed;
    private Integer testCasesPassed;
    private Integer totalTestCases;
    private LocalDateTime submittedAt;

    @PrePersist
    protected void onCreate() {
        submittedAt = LocalDateTime.now();
    }

    public enum SubmissionStatus {
        PENDING, ACCEPTED, WRONG_ANSWER,
        TIME_LIMIT_EXCEEDED, RUNTIME_ERROR, COMPILATION_ERROR
    }
}