package com.mirriga.models;

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.Getter;

@Getter
public class CoordinateRequestDto implements Serializable {
    private Long areaId;
    private Long nodeOrder;
    private BigDecimal latitude;
    private BigDecimal longitude;
}
