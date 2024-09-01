package com.imrsac.dao.repositories;

import com.imrsac.dao.entities.SoilEntity;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.RequestScoped;

@RequestScoped
public class SoilRepository implements PanacheRepository<SoilEntity> {
}
