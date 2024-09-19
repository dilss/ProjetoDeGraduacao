package com.mirriga.dao.repositories;

import com.mirriga.dao.entities.PlantationEntity;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.RequestScoped;

@RequestScoped
public class PlantationRepository implements PanacheRepository<PlantationEntity> {

}
