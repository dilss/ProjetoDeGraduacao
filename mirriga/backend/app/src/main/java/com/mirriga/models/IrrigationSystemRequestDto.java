package com.mirriga.models;

import java.io.Serializable;

import lombok.Getter;

@Getter
public class IrrigationSystemRequestDto implements Serializable {
    private Long id;
    private String name;
    private String category;
    private String type;
    private Double efficiency;
    private Long flowRate;
}
