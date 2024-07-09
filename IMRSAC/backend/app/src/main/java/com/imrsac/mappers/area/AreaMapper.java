package com.imrsac.mappers.area;

import com.imrsac.dao.entities.area.Area;
import com.imrsac.models.area.CreateAreaRequest;
import com.imrsac.models.area.UpdateAreaRequest;

public interface AreaMapper {

    public static Area fromCreateToAreaEntity(CreateAreaRequest request) {
        Area area = new Area();
        area.name = request.getName();
        area.coordinates = CoordinateMapper.fromCreateToCoordinateEntitySet(request.getCoordinates());
        return area;
    }

    public static Area fromUpdateToAreaEntity(UpdateAreaRequest request) {
        Area area = new Area();
        area.name = request.getName();
        area.coordinates = CoordinateMapper.fromUpdateToCoordinateEntitySet(request.getCoordinates());
        return area;
    }
}
