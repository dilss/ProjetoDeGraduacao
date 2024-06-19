package com.imrsac.models.soil;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateSoilRequest implements Serializable {
    private String name;
    private Float fieldCapacity;
    private Float permanentWitingPoint;
    private Float density;    
}
