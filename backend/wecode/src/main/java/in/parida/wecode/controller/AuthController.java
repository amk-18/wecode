package in.parida.wecode.controller;

import in.parida.wecode.dto.AuthRequest;
import in.parida.wecode.model.User;
import in.parida.wecode.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody AuthRequest authRequest) {
        try {
            User user = userService.createUser(
                    authRequest.getUsername(),
                    authRequest.getEmail(),
                    authRequest.getPassword()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("userId", user.getId());
            response.put("username", user.getUsername());

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthRequest authRequest) {
        // Simple demo login - in real app, use proper authentication
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Login successful (demo)");
        response.put("userId", 1);
        response.put("username", "demo_user");

        return ResponseEntity.ok(response);
    }
}