package in.parida.wecode.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class DatabaseConfig implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    public DatabaseConfig(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            log.info("✅ Database connection successful!");
            log.info("🚀 WeCode application is ready!");
        } catch (Exception e) {
            log.error("❌ Database connection failed: {}", e.getMessage());
        }
    }
}