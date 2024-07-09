package com.imrsac.dao.entities.area;

import java.io.Serializable;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CoordinateKey implements Serializable {
    @Column(name = "area_id", nullable = false)
    private Long areaId;

    @Column(name = "node_order", nullable = false)
    private Long nodeOrder;
}
