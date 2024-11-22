package com.avansoft.module_java_remake.filter;

import com.avansoft.module_java_remake.utils.JwtTokenUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer")) {
            token = token.substring(7);
            if (JwtTokenUtil.validateToken(token)) {
                String username = JwtTokenUtil.getUsernameFromToken(token);
                UsernamePasswordAuthenticationToken authentication  = new UsernamePasswordAuthenticationToken(username,null,null);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("Hop Le");
            } else {
                System.out.println("Khong hop le");
            }
        }
        filterChain.doFilter(request,response);
    }
}
