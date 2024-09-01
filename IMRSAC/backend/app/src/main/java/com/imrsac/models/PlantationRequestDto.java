package com.imrsac.models;

import java.io.Serializable;

import lombok.Getter;

@Getter
public class PlantationRequestDto implements Serializable {
    private Long id;
    private String name;
    private Long areaId;
    private Long agriculturalCropId;
    private Long irrigationSystemId;
}
