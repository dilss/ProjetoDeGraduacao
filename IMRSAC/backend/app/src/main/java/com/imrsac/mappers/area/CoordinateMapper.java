package com.imrsac.mappers.area;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.imrsac.dao.entities.area.Coordinate;
import com.imrsac.models.coordinate.CreateCoordinateRequest;
import com.imrsac.models.coordinate.UpdateCoordinateRequest;

public interface CoordinateMapper {
    public static Coordinate fromCreateToCoordinateEntity(CreateCoordinateRequest request) {
        Coordinate coordinate = new Coordinate();
        coordinate.latitude = request.getLatitude();
        coordinate.longitude = request.getLongitude();
        coordinate.nodeOrder = request.getNodeOrder();
        return coordinate;
    }

    public static Coordinate fromUpdateToCoordinateEntity(UpdateCoordinateRequest request) {
        Coordinate coordinate = new Coordinate();
        coordinate.latitude = request.getLatitude();
        coordinate.longitude = request.getLongitude();
        coordinate.nodeOrder = request.getNodeOrder();
        return coordinate;
    }

    public static Set<Coordinate> fromCreateToCoordinateEntitySet(List<CreateCoordinateRequest> list) {
        Set<Coordinate> set = new HashSet<>();
        list.forEach(element -> set.add(fromCreateToCoordinateEntity(element)));
        return set;
    }

    public static Set<Coordinate> fromUpdateToCoordinateEntitySet(List<UpdateCoordinateRequest> list) {
        Set<Coordinate> set = new HashSet<>();
        list.forEach(element -> set.add(fromUpdateToCoordinateEntity(element)));
        return set;
    }
}
