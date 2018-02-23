package com.freeman.configuration.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Created by Dmitriy Nefedchenko on 23.02.18.
 */
@Service
public class OsmdUserDetailsService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return User
                .withUsername("user")
                .password("$2a$10$1dcpbtyv0KMjr/NIyb8WHe1fEPoG0BtQ1JQIUskWvuZkG3JiVoyRm")
                .authorities("ROLE_USER")
                .build();
    }
}
