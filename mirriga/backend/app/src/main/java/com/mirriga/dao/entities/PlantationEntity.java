package com.mirriga.dao.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "plantations")
public class PlantationEntity extends PanacheEntity {

    @Column(length = 100, nullable = false)
    private String name;

    @OneToOne
    @JoinColumn(name = "area_id")
    @JsonIgnoreProperties({ "plantation", "coordinates", "createdAt", "soil.coordinates", "soil.createdAt" })
    private AreaEntity area;

    @ManyToOne
    @JoinColumn(name = "agricultural_crop_id")
    @JsonIgnoreProperties({ "plantations", "createdAt" })
    private AgriculturalCropEntity agriculturalCrop;

    @OneToOne
    @JoinColumn(name = "irrigation_system_id")
    @JsonIgnoreProperties({ "plantation", "createdAt" })
    private IrrigationSystemEntity irrigationSystem;

    @OneToMany(mappedBy = "plantation", cascade = { CascadeType.REMOVE }, fetch = FetchType.EAGER)
    @JsonIgnoreProperties({ "plantation" })
    private Set<SensorEntity> sensors;
}
