package org.creativeyann17.exporeactiveapp;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Slf4j
@Configuration
public class ApplicationRoutes {

  @Bean
  public RouterFunction<ServerResponse> index() {
    final Resource indexResource = new ClassPathResource("public/index.html");
    log.info("Add route GET / -> {}", indexResource.toString());
    return route(GET("/"), req -> ok().contentType(MediaType.TEXT_HTML).bodyValue(indexResource));
  }
}
