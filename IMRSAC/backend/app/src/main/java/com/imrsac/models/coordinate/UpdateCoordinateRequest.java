package com.imrsac.models.coordinate;

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCoordinateRequest implements Serializable {
    private Long areaId;
    private Long nodeOrder;
    private BigDecimal latitude;
    private BigDecimal longitude;
}
