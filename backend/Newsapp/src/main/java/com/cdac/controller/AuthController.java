package com.cdac.controller;
import com.cdac.authModel.AuthRequest;
import com.cdac.service.UserDetailsServiceImpl;
import com.cdac.utilities.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;  // Utility class for JWT generation

    @Autowired
    private UserDetailsServiceImpl userDetailsService;  // Your custom UserDetailsService



    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequest authRequest) {
        System.out.println("sadddddddddddddd");
        System.out.println("Username: " + authRequest.getUsername());
        System.out.println("Password: " + authRequest.getPassword());
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );

            // Load user details
            final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());

            // Generate JWT token
            final String jwtToken = jwtUtil.generateToken(userDetails);

            // Print the token to the console for debugging
            System.out.println("Generated Token: " + jwtToken);

            // Return the token in JSON format
            Map<String, String> response = new HashMap<>();
            response.put("token", jwtToken);
            return ResponseEntity.ok(response);

        } catch (AuthenticationException e) {
            // Return an error response if authentication fails
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed!");
        }
    }

}
