package com.imrsac.models;

import lombok.Getter;

@Getter
public class SensorRequestDto {
    private String deviceEui;
    private Long plantationId;
    private String name;
    private Double latitude;
    private Double longitude;
}
