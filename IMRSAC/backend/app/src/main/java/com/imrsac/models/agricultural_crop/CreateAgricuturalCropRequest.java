package com.imrsac.models.agricultural_crop;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAgricuturalCropRequest {
    private String name;
    private Long rootDepth;
    private Double waterAvailabilityFactor;
    private Long cicleDurationDays;
    private Long durationPercentagePhaseOne;
    private Long durationPercentagePhaseTwo;
    private Long durationPercentagePhaseThree;
    private Long durationPercentagePhaseFour;
}
