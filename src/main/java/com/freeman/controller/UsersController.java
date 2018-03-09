package com.freeman.controller;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 * Created by Dmitriy Nefedchenko on 09.03.2018.
 */
@RestController
@RequestMapping(value = "/users")
public class UsersController {
    @GetMapping(value = "/me")
    public UserDetails getCurrentPrincipal(@AuthenticationPrincipal Principal principal) {
        return (User)((UsernamePasswordAuthenticationToken)principal).getPrincipal();
    }
}
