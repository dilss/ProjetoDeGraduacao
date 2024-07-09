package com.imrsac.models.area;

import java.io.Serializable;
import java.util.List;

import com.imrsac.models.coordinate.UpdateCoordinateRequest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateAreaRequest implements Serializable {
    private Long id;
    private Long soilId;
    private String name;
    private List<UpdateCoordinateRequest> coordinates;
}
