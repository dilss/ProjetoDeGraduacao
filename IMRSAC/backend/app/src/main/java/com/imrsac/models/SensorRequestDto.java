package com.imrsac.models;

import lombok.Getter;

@Getter
public class SensorRequestDto {
    private String sensorEui;
    private String name;
    private Double latitude;
    private Double longitude;
    
}
