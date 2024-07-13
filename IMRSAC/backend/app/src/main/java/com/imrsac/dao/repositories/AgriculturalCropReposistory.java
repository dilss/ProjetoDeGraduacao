package com.imrsac.dao.repositories;

import com.imrsac.dao.entities.agricultural_crop.AgriculturalCrop;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.RequestScoped;

@RequestScoped
public class AgriculturalCropReposistory implements PanacheRepository<AgriculturalCrop> {
}
