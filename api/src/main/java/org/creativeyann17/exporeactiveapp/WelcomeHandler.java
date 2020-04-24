package org.creativeyann17.exporeactiveapp;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
public class WelcomeHandler implements WebSocketHandler {

  @Autowired
  private ObjectMapper objectMapper;

  public Flux<String> reverseString(String userInput) {
    return Flux.just(new StringBuilder(userInput).reverse().toString());
  }

  @SneakyThrows
  @Override
  public Mono<Void> handle(WebSocketSession session) {
    log.debug("Open WebSocketSession " + session);
    session.send(session.receive().doFinally(sign -> {
      log.debug("Close WebSocketSession " + session);
    })
        .map(WebSocketMessage::getPayloadAsText)
        .flatMap(this::reverseString)
        .map(reversedString -> session.textMessage(reversedString))).subscribe(System.out::println);

    return Mono.empty();
  }
}
