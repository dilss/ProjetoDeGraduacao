package com.mirriga.dao.repositories;

import com.mirriga.dao.entities.AgriculturalCropEntity;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.RequestScoped;

@RequestScoped
public class AgriculturalCropReposistory implements PanacheRepository<AgriculturalCropEntity> {
}
