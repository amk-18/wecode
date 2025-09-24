package in.parida.wecode.service;

import in.parida.wecode.dto.ProblemDTO;
import in.parida.wecode.model.Problem;
import in.parida.wecode.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProblemService {

    @Autowired
    private ProblemRepository problemRepository;

    public List<ProblemDTO> getAllProblems() {
        return problemRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(ProblemDTO::new)
                .collect(Collectors.toList());
    }

    public ProblemDTO getProblemById(Long id) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found with id: " + id));
        return new ProblemDTO(problem);
    }

    public ProblemDTO getProblemBySlug(String slug) {
        Problem problem = problemRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Problem not found with slug: " + slug));
        return new ProblemDTO(problem);
    }

    public List<ProblemDTO> getProblemsByDifficulty(String difficulty) {
        Problem.Difficulty diff = Problem.Difficulty.valueOf(difficulty.toUpperCase());
        return problemRepository.findByDifficulty(diff).stream()
                .map(ProblemDTO::new)
                .collect(Collectors.toList());
    }

    public List<ProblemDTO> searchProblems(String query) {
        return problemRepository.searchProblems(query).stream()
                .map(ProblemDTO::new)
                .collect(Collectors.toList());
    }
}