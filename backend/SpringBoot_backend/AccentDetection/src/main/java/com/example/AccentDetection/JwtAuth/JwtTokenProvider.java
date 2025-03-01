package com.example.AccentDetection.JwtAuth;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import  io.jsonwebtoken.*;    // import jsontocken classes
import com.example.AccentDetection.entity.User;
import java.util.*;
import  java.security.Key;
import java.util.stream.Collectors;

import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider{
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-ms}")
    private long jwtExpirationMs;

    private Key signingKey;

    // Initialize the signing key in a constructor or @PostConstruct
    @PostConstruct
    private void init() {
        this.signingKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // header.payload.signature = JWT

    // Generate JWT token
    public String generateToken(UserDetails userDetails) {
        Map<String,Object> claims = new HashMap<>();

        claims.put("roles",userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));

        //Generate token
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(signingKey, SignatureAlgorithm.HS512) // Signs the token with the generated key and specifies the signing algorithm (HS512)
                .compact();
    }

    // Validate JWT token
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(signingKey) // Use the same key as in generateToken
                    .build()                   // signature = hash(header + payload + signingKey)   header.payload.signature = JWT
                    .parseClaimsJws(token);
            return true;
        } catch (SecurityException ex) {
            System.out.println("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            System.out.println("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            System.out.println("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            System.out.println("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            System.out.println("JWT claims string is empty.");
        }
        return false;
    }

    // Extract username from JWT token
    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    // Extract Role from JWT token
    public List<String> getRolesFromToken(String token){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        Object rolesObj = claims.get("roles");

        if (rolesObj instanceof List<?>) {
            // Safely cast to a List of Strings
            return ((List<?>) rolesObj).stream()
                    .filter(role -> role instanceof String)
                    .map(Object::toString)
                    .collect(Collectors.toList());
        }

        return Collections.emptyList(); // Return empty list if roles are not present or invalid
    }
}
