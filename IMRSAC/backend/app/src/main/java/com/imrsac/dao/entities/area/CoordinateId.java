package com.imrsac.dao.entities.area;

import java.io.Serializable;
import java.math.BigDecimal;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CoordinateId implements Serializable {
    @Column(nullable = false, precision = 21, scale = 18)
    public BigDecimal latitude;

    @Column(nullable = false, precision = 21, scale = 18)
    public BigDecimal longitude;
}
