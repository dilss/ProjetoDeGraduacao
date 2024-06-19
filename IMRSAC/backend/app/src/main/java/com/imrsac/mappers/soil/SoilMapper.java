package com.imrsac.mappers.soil;

import com.imrsac.dao.entities.soil.Soil;
import com.imrsac.models.soil.CreateSoilRequest;

public interface SoilMapper {
     public static Soil toSoilEntity(CreateSoilRequest request) {
        Soil soil = new Soil();
        soil.name = request.getName();
        soil.fieldCapacity = request.getFieldCapacity();
        soil.permanentWiltingPoint = request.getPermanentWitingPoint();
        soil.density = request.getDensity();
        return soil;
    }    
}
