package com.imrsac.dao.repositories;

import com.imrsac.dao.entities.plantation.Plantation;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.RequestScoped;

@RequestScoped
public class PlantationRepository implements PanacheRepository<Plantation> {

}
