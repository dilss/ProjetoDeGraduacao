package com.imrsac.dao.entities.plantation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.imrsac.dao.entities.agricultural_crop.AgriculturalCrop;
import com.imrsac.dao.entities.area.Area;
import com.imrsac.dao.entities.irrigation_system.IrrigationSystem;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "plantations")
public class Plantation extends PanacheEntity {

    @Column(length = 100, nullable = false)
    public String name;

    @OneToOne
    @JoinColumn(name = "area_id")
    @JsonIgnoreProperties({ "plantation", "coordinates", "createdAt", "soil.coordinates", "soil.createdAt" })
    public Area area;

    @ManyToOne
    @JoinColumn(name = "agricultural_crop_id")
    @JsonIgnoreProperties({ "plantations", "createdAt" })
    public AgriculturalCrop agriculturalCrop;

    @OneToOne
    @JoinColumn(name = "irrigation_system_id")
    @JsonIgnoreProperties({ "plantation", "createdAt" })
    public IrrigationSystem irrigationSystem;
}
