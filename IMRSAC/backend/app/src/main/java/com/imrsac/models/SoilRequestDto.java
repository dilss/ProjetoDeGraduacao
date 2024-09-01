package com.imrsac.models;

import java.io.Serializable;

import lombok.Getter;

@Getter
public class SoilRequestDto implements Serializable {
    private String name;
    private Float fieldCapacity;
    private Float permanentWiltingPoint;
    private Float density;    
}
