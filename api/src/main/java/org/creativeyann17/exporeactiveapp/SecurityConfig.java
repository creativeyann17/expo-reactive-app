package org.creativeyann17.exporeactiveapp;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@EnableWebFluxSecurity
public class SecurityConfig {

  @Bean
  public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
    return http.csrf()
        .disable()
        .cors()
        .disable()
        .httpBasic()
        .and()
        .authorizeExchange()
        .pathMatchers("/", "/static/**", "/pwa/**", "/*.json", "/*.png", "/*.jpg", "/*.ico")
        .permitAll()
        .anyExchange()
        .authenticated()
        .and()
        .build();
  }
}