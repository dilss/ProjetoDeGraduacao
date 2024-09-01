package com.imrsac.models;

import java.io.Serializable;
import java.util.List;

import lombok.Getter;

@Getter
public class AreaRequestDto implements Serializable {
    private Long id;
    private Long soilId;
    private String name;
    private Double area;
    private List<CoordinateRequestDto> coordinates;
}
