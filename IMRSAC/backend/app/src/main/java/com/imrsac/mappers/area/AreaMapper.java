package com.imrsac.mappers.area;

import com.imrsac.dao.entities.area.Area;
import com.imrsac.models.area.CreateAreaRequest;

public interface AreaMapper {

    public static Area toAreaEntity(CreateAreaRequest request) {
        Area area = new Area();
        area.name = request.getName();
        area.coordinates = CoordinateMapper.toCoordinateEntityList(request.getCoordinates());
        return area;
    }
}
