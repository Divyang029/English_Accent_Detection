package com.example.AccentDetection.JwtAuth;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenProvider jwtTokenProvider; // Utility class for token validation

    @Autowired
    private UserDetailsService userDetailsService;

    @Override   // @NotNull because  Spring applies a @NonNullApi annotation at the package level by default Since the HttpServletRequest, HttpServletResponse, and FilterChain parameters are not explicitly annotated, the IDE raises this warning
    protected void doFilterInternal(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response,@NonNull FilterChain filterChain) throws ServletException, IOException {
        // Extract token from Authorization header                                                                                  // filterchain  pass the request and response to the next filter in the chain.
        String token = getJwtFromRequest(request);

        if(StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)) {
            // Get email from the token
            String email = jwtTokenProvider.getEmailFromToken(token);

            // Load user details
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            // Create an Authentication object
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());

            // Set the Authentication object in SecurityContext
            SecurityContextHolder.getContext().setAuthentication(authentication);

            System.out.println("User authenticated: " + email + " with roles ");
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // Remove "Bearer " prefix
        }
        return null;
    }
}