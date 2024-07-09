package com.imrsac.models.coordinate;

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCoordinateRequest implements Serializable {
    private Long nodeOrder;
    private BigDecimal latitude;
    private BigDecimal longitude;
}
