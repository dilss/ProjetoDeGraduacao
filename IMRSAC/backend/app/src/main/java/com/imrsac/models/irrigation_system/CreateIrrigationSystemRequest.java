package com.imrsac.models.irrigation_system;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateIrrigationSystemRequest {
    private String name;
    private String category;
    private String type;
    private Double efficiency;
    private Long flowRate;
}
