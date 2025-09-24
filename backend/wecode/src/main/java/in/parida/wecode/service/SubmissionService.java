package in.parida.wecode.service;

import in.parida.wecode.dto.SubmissionDTO;
import in.parida.wecode.model.Submission;
import in.parida.wecode.model.User;
import in.parida.wecode.model.Problem;
import in.parida.wecode.repository.SubmissionRepository;
import in.parida.wecode.repository.UserRepository;
import in.parida.wecode.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProblemRepository problemRepository;

    public SubmissionDTO createSubmission(Long userId, Long problemId, String code, String language) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new RuntimeException("Problem not found"));

        Submission submission = new Submission();
        submission.setUser(user);
        submission.setProblem(problem);
        submission.setCode(code);
        submission.setLanguage(language);
        submission.setStatus(Submission.SubmissionStatus.PENDING);

        // Simulate code execution (for demo)
        simulateCodeExecution(submission);

        Submission savedSubmission = submissionRepository.save(submission);
        return new SubmissionDTO(savedSubmission);
    }

    private void simulateCodeExecution(Submission submission) {
        // Simulate execution results
        submission.setStatus(Submission.SubmissionStatus.ACCEPTED);
        submission.setTestCasesPassed(3);
        submission.setTotalTestCases(3);
        submission.setExecutionTime(50 + (int)(Math.random() * 100));
        submission.setMemoryUsed(128 + (int)(Math.random() * 128));
    }

    public List<SubmissionDTO> getUserSubmissions(Long userId) {
        return submissionRepository.findUserSubmissions(userId).stream()
                .map(SubmissionDTO::new)
                .collect(Collectors.toList());
    }

    public List<SubmissionDTO> getProblemSubmissions(Long problemId) {
        return submissionRepository.findByProblemIdOrderBySubmittedAtDesc(problemId).stream()
                .map(SubmissionDTO::new)
                .collect(Collectors.toList());
    }

    public SubmissionDTO getSubmissionById(Long id) {
        Submission submission = submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
        return new SubmissionDTO(submission);
    }
}