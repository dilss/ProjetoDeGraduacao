package com.imrsac.models.area;

import java.util.List;
import com.imrsac.models.coordinate.CreateCoordinateRequest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAreaRequest {
    private Long soilId;
    private String name;
    private List<CreateCoordinateRequest> coordinates;
}
