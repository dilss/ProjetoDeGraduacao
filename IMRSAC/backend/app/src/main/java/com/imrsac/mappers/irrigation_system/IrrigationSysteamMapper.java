package com.imrsac.mappers.irrigation_system;

import com.imrsac.dao.entities.irrigation_system.IrrigationSystem;
import com.imrsac.models.irrigation_system.CreateIrrigationSystemRequest;

public class IrrigationSysteamMapper {

    public static IrrigationSystem toEntity(CreateIrrigationSystemRequest request) {
        IrrigationSystem entity = new IrrigationSystem();
        entity.name = request.getName();
        entity.category = request.getCategory();
        entity.type = request.getType();
        entity.efficiency = request.getEfficiency();
        entity.flowRate = request.getFlowRate();
        return entity;
    }
}
