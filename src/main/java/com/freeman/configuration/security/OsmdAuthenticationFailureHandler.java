package com.freeman.configuration.security;

import org.springframework.context.MessageSource;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Locale;

/**
 * Created by Dmitriy Nefedchenko on 27.02.2018.
 */
public class OsmdAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    private MessageSource messageSource;

    public OsmdAuthenticationFailureHandler(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String message = messageSource.getMessage("authentication.failure.message", new Object[]{}, Locale.getDefault());
        String en_message = messageSource.getMessage("authentication.failure.message", new Object[]{}, Locale.ENGLISH);
        if (exception instanceof BadCredentialsException) {
            setDefaultFailureUrl(String.format("/login?error=%s", message));
        } else {
            setDefaultFailureUrl("/login?error");
        }
        super.onAuthenticationFailure(request, response, exception);
    }
}
