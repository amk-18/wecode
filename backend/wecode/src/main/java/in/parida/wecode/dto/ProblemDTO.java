package in.parida.wecode.dto;

import in.parida.wecode.model.Problem;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ProblemDTO {
    private Long id;
    private String title;
    private String slug;
    private String description;
    private Problem.Difficulty difficulty;
    private String starterCode;
    private String functionName;
    private String constraints;
    private String examples;
    private String hints;
    private LocalDateTime createdAt;

    public ProblemDTO(Problem problem) {
        this.id = problem.getId();
        this.title = problem.getTitle();
        this.slug = problem.getSlug();
        this.description = problem.getDescription();
        this.difficulty = problem.getDifficulty();
        this.starterCode = problem.getStarterCode();
        this.functionName = problem.getFunctionName();
        this.constraints = problem.getConstraints();
        this.examples = problem.getExamples();
        this.hints = problem.getHints();
        this.createdAt = problem.getCreatedAt();
    }
}