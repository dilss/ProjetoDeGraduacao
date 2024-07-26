package com.imrsac.models.irrigation_system;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateIrrigationSystemRequest implements Serializable {
    private Long id;
    private String name;
    private String category;
    private String type;
    private Double efficiency;
    private Long flowRate;
}
