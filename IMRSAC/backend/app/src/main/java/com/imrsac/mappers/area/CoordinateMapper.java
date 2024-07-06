package com.imrsac.mappers.area;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.imrsac.dao.entities.area.Coordinate;
import com.imrsac.models.coordinate.CreateCoordinateRequest;

public interface CoordinateMapper {
    public static Coordinate toCoordinateEntity(CreateCoordinateRequest request) {
        Coordinate coordinate = new Coordinate();
        coordinate.latitude = request.getLatitude();
        coordinate.longitude = request.getLongitude();
        coordinate.nodeOrder = request.getNodeOrder();
        return coordinate;
    }
    
    public static Set<Coordinate> toCoordinateEntitySet(List<CreateCoordinateRequest> requestList) {
        Set<Coordinate> set = new HashSet<>();
        requestList.forEach( element -> set.add(toCoordinateEntity(element)));    
        return set;
    }
}
