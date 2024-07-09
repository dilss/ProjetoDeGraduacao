package com.imrsac.services;

import java.util.List;
import java.util.Map;

import org.jboss.logging.Logger;

import com.imrsac.dao.entities.soil.Soil;
import com.imrsac.dao.repositories.SoilRepository;
import com.imrsac.exceptions.IMRSACErrorEnum;
import com.imrsac.exceptions.IMRSACExeption;

import io.quarkus.panache.common.Parameters;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class SoilService {

    @Inject
    private SoilRepository soilRepository;

    private static final Logger LOG = Logger.getLogger(SoilService.class);

    public List<Soil> getAllSoils() throws IMRSACExeption {
        try {
            return this.soilRepository.listAll();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_FETCHING_SOILS);
        }
    }

    public Soil createSoil(Soil soil) throws IMRSACExeption {
        try {
            this.soilRepository.persist(soil);
            return soil;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            System.out.println(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_PERSISTING_SOIL);
        }
    }

    public Soil findSoilById(Long soilId) throws IMRSACExeption {
        try {
            return this.soilRepository.findByIdOptional(soilId)
                    .orElseThrow(() -> new IMRSACExeption(IMRSACErrorEnum.SOIL_NOT_FOUND_IN_THE_DATABASE));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw e;
        }
    }

    public Soil editSoil(Soil soil) throws IMRSACExeption {
        Map<String, Object> params = Parameters.with("name", soil.name).and("cc", soil.fieldCapacity)
                .and("pmp", soil.permanentWiltingPoint).and("density", soil.density).and("id", soil.id).map();
        String query = "update Soil s set s.name = :name, s.fieldCapacity = :cc, s.permanentWiltingPoint = :pmp, s.density = :density where s.id = :id";
        try {
            this.soilRepository.update(query, params);
            return soil;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_UPDATING_SOIL);
        }
    }

    public boolean deleteSoil(Long soilId) throws IMRSACExeption {
        Soil soil = this.soilRepository.findById(soilId);
        soil.associatedAreas.forEach(area -> area.soil = null);
        try {
            return this.soilRepository.deleteById(soilId);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_REMOVING_SOIL);
        }
    }
}
