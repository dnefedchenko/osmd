package com.freeman.configuration.security;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Dmitriy Nefedchenko on 27.02.2018.
 */
public class OsmdAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        if (exception instanceof BadCredentialsException) {
            setDefaultFailureUrl("/login?error=Username+or+password+is+incorrect");
        } else {
            setDefaultFailureUrl("/login?error");
        }
        super.onAuthenticationFailure(request, response, exception);
    }
}
