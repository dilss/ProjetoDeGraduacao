package com.imrsac.mappers.area;

import java.util.ArrayList;
import java.util.List;

import com.imrsac.dao.entities.area.Coordinate;
import com.imrsac.models.coordinate.CreateCoordinateRequest;

public interface CoordinateMapper {
    public static Coordinate toCoordinateEntity(CreateCoordinateRequest request) {
        Coordinate coordinate = new Coordinate();
        coordinate.latitude = request.getLatitude();
        coordinate.longitude = request.getLongitude();
        return coordinate;
    }
    
    public static List<Coordinate> toCoordinateEntityList(List<CreateCoordinateRequest> requestList) {
        List<Coordinate> list = new ArrayList<>();
        requestList.forEach( element -> list.add(toCoordinateEntity(element)));    
        return list;
    }
}
