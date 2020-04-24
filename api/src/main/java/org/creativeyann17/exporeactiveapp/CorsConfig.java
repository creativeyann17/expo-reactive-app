package org.creativeyann17.exporeactiveapp;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Slf4j
@Configuration
public class CorsConfig {

  @Bean
  @Profile("foo") // not working with websocket disabled for now
  public CorsWebFilter corsWebFilter() {
    CorsConfiguration corsConfig = new CorsConfiguration();
    corsConfig.setAllowCredentials(true);
    corsConfig.setAllowedOrigins(Arrays.asList("https://localhost:3000", "http://localhost:3000"));
    corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH"));
    corsConfig.setMaxAge(3600L);
    corsConfig.addAllowedHeader("*");

    UrlBasedCorsConfigurationSource source =
        new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfig);

    log.debug("CORS configuration enabled : {} {}", corsConfig.getAllowedOrigins(), corsConfig.getAllowedMethods());

    return new CorsWebFilter(source);
  }
}
