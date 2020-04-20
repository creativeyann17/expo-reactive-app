package org.creativeyann17.exporeactiveapp;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@EnableWebFluxSecurity
@ConfigurationProperties(prefix = "security")
public class SecurityConfig {

  private List<String> resources = Arrays.asList();

  @Bean
  public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
    return http.csrf()
        .disable()
        .cors()
        .disable()
        .httpBasic()
        .and()
        .authorizeExchange()
        .pathMatchers(resources.toArray(String[]::new))
        .permitAll()
        .anyExchange()
        .authenticated()
        .and()
        .build();
  }
}
