package com.imrsac.models;

import lombok.Getter;

@Getter
public class AgriculturalCropRequestDto {
    private Long id;
    private String name;
    private Long rootDepth;
    private Double waterAvailabilityFactor;
    private Long cicleDurationDays;
    private Long durationPercentagePhaseOne;
    private Long durationPercentagePhaseTwo;
    private Long durationPercentagePhaseThree;
    private Long durationPercentagePhaseFour;  
}
