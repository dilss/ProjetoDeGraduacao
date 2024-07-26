package com.imrsac.models.plantation;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePlantationRequest implements Serializable {
    private Long id;
    private String name;
    private Long areaId;
    private Long agriculturalCropId;
    private Long irrigationSystemId;
}
