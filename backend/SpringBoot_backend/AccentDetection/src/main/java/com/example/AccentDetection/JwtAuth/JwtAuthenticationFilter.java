package com.example.AccentDetection.JwtAuth;
import ch.qos.logback.core.net.SyslogOutputStream;
import com.example.AccentDetection.service.UserService;
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

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenProvider jwtTokenProvider; // Utility class for token validation

    @Autowired
    private UserService userService;

    @Override   // @NotNull because  Spring applies a @NonNullApi annotation at the package level by default Since the HttpServletRequest, HttpServletResponse, and FilterChain parameters are not explicitly annotated, the IDE raises this warning
    protected void doFilterInternal(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response,@NonNull FilterChain filterChain) throws ServletException, IOException {
        // Extract token from Authorization header                                                                                  // filterchain  pass the request and response to the next filter in the chain.
        String token = getJwtFromRequest(request);
        if(StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)) {
            // Get email & roles from the token
            String email = jwtTokenProvider.getEmailFromToken(token);
            List<String> roles = jwtTokenProvider.getRolesFromToken(token);
//            Long userId = claims.get("userId", Long.class);  // Extract userId

            if(email!=null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userService.loadUserByUsername(email);

                // Create an Authentication object
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());


                // Set the Authentication object in SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            System.out.println("User authenticated: " + email + " with roles ");
        }//else{
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired JWT token");
//            return;
//        }

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