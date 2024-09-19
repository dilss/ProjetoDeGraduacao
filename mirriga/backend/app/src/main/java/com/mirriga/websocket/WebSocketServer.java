package com.mirriga.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/mirriga-web-socket", encoders = {PayloadEncoder.class})
@ApplicationScoped
public class WebSocketServer {

    private static final Logger LOG = LoggerFactory.getLogger(WebSocketServer.class);
    Session session;

    @OnOpen
    public void onOpen(Session session) {
        LOG.info("Sessão WebSocket aberta. ID da sessão: {}", session.getId());
        this.session = session;
    }

    @OnClose
    public void onClose(Session session) {
        LOG.info("Sessão WebSocket foi fechada. ID da sessão: {}", session.getId());
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        LOG.error("Um erro ocorreu com a sessão WebSocket. ID da sessão: {}. Erro: {}", session.getId(),
                throwable.getMessage());
    }

    public void sendData(WebSocketPayload payload) {
        if (null == this.session) {
            return;
        }
        this.session.getAsyncRemote().sendObject(payload, result -> {
            if (result.getException() != null) {
                LOG.error("Um erro ocorreu no envio de dados para o frontend. Erro: {}",
                        result.getException().getMessage());

                System.out.println("Unable to send message: " + result.getException());
            }
        });

    }

}