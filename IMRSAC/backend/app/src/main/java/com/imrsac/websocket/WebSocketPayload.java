package com.imrsac.websocket;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WebSocketPayload {
    private String sensorName;
    private String data;    
}
