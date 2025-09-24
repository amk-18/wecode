package in.parida.wecode.repository;

import in.parida.wecode.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface ProblemRepository extends JpaRepository<Problem, Long> {
    Optional<Problem> findBySlug(String slug);
    List<Problem> findByDifficulty(Problem.Difficulty difficulty);

    // Fixed query - remove LOWER() function for CLOB fields
    @Query("SELECT p FROM Problem p WHERE p.title LIKE %:query% OR p.description LIKE %:query%")
    List<Problem> searchProblems(@Param("query") String query);

    @Query("SELECT p FROM Problem p ORDER BY p.createdAt DESC")
    List<Problem> findAllByOrderByCreatedAtDesc();
}