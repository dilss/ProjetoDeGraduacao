package com.mirriga.dao.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
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
@Table(name = "sensors")
public class SensorEntity extends PanacheEntityBase {

    @Id
    @Column(name = "id")
    private String deviceEui;

    private String name;
    private Double latitude;
    private Double longitude;

    @Column(name = "network_key")
    private String networkKey;

    @ManyToOne
    @JsonIgnoreProperties({ "area", "agriculturalCrop", "irrigationSystem", "sensors" })
    private PlantationEntity plantation;
}
