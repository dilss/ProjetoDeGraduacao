package com.imrsac.dao.entities.soil;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "soil")
public class Soil extends PanacheEntity {
    
    @Column(length = 100, nullable = false)
    public String name;

    @Column(name = "cc", nullable = false)
    public Float fieldCapacity;

    @Column(name = "pmp", nullable = false)
    public Float permanentWiltingPoint;

    @Column(nullable = false)
    public Float density;  
}
