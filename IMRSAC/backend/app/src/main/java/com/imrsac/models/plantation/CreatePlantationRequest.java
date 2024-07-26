package com.imrsac.models.plantation;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePlantationRequest implements Serializable {
    private String name;
    private Long areaId;
    private Long agriculturalCropId;
    private Long irrigationSystemId;
}
