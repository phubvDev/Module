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

        // Kiểm tra nếu có Authorization header và token bắt đầu bằng "Bearer"
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);  // Lấy token sau "Bearer "

            // Kiểm tra tính hợp lệ của token
            if (JwtTokenUtil.validateToken(token)) {
                String username = JwtTokenUtil.getUsernameFromToken(token);

                // Bạn có thể thêm authorities (role) nếu cần
                // Đây là ví dụ với quyền mặc định (có thể điều chỉnh theo yêu cầu của bạn)
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(username, null, null); // Thêm authorities nếu có

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Đặt thông tin xác thực vào SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("Token hợp lệ. Người dùng: " + username);
            } else {
                // Token không hợp lệ, bạn có thể trả về lỗi hoặc tiếp tục xử lý
                System.out.println("Token không hợp lệ");
            }
        } else {
            // Nếu không có Authorization header hoặc token không bắt đầu bằng "Bearer"
            System.out.println("Không có token trong header hoặc token không hợp lệ");
        }

        // Tiếp tục chuỗi lọc
        filterChain.doFilter(request, response);
    }
}
