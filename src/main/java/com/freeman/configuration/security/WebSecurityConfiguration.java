package com.freeman.configuration.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Created by Dmitriy Nefedchenko on 23.02.18.
 */
@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired private OsmdUserDetailsService userDetailsService;
    @Autowired private MessageSource messageSource;

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/resources/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint())
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/auth/login").permitAll()
                .antMatchers(HttpMethod.GET, "/").permitAll()
                .anyRequest().authenticated()
            .and()
                .formLogin()
                    .loginPage("/")
                    .loginProcessingUrl("/auth/login")
                    .successHandler(authenticationSuccessHandler())
                    .failureHandler(authenticationFailureHandler())
                    .permitAll()
            .and()
                .logout()
                    .logoutUrl("/logout")
                    .logoutRequestMatcher(new AntPathRequestMatcher("/auth/logout", HttpMethod.POST.name()))
                    .logoutSuccessHandler(logoutSuccessHandler())
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
            .and().csrf().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    private AuthenticationFailureHandler authenticationFailureHandler() {
        return new OsmdAuthenticationFailureHandler(this.messageSource);
    }

    private AuthenticationSuccessHandler authenticationSuccessHandler() {
        return new OsmdAuthenticationSuccessHandler();
    }

    private AuthenticationEntryPoint restAuthenticationEntryPoint() {
        return new RestAutheticationEntryPoint();
    }

    private LogoutSuccessHandler logoutSuccessHandler() {
        return new OsmdLogoutSuccessHandler();
    }
}
