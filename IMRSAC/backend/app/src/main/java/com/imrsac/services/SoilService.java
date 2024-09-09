package com.imrsac.services;

import java.util.List;
import org.jboss.logging.Logger;

import com.imrsac.dao.entities.SoilEntity;
import com.imrsac.dao.repositories.SoilRepository;
import com.imrsac.exceptions.IMRSACErrorEnum;
import com.imrsac.exceptions.IMRSACExeption;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class SoilService {

    @Inject
    private SoilRepository soilRepository;

    private static final Logger LOG = Logger.getLogger(SoilService.class);

    public List<SoilEntity> getAllSoils() throws IMRSACExeption {
        try {
            return this.soilRepository.listAll();
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_FETCHING_SOILS);
        }
    }

    public SoilEntity createSoil(SoilEntity soil) throws IMRSACExeption {
        try {
            this.soilRepository.persist(soil);
            return soil;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            System.out.println(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_PERSISTING_SOIL);
        }
    }

    public SoilEntity findSoilById(Long soilId) throws IMRSACExeption {
        try {
            return this.soilRepository.findByIdOptional(soilId)
                    .orElseThrow(() -> new IMRSACExeption(IMRSACErrorEnum.SOIL_NOT_FOUND_IN_THE_DATABASE));
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw e;
        }
    }

    public SoilEntity editSoil(SoilEntity soil) throws IMRSACExeption {
        try {
            SoilEntity soilEntity = this.soilRepository.findById(soil.id);
            soilEntity.setName(soil.getName());
            soilEntity.setFieldCapacity(soil.getFieldCapacity());
            soilEntity.setPermanentWiltingPoint(soil.getPermanentWiltingPoint());
            soilEntity.setDensity(soil.getDensity());
            return soilEntity;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_UPDATING_SOIL);
        }
    }

    public boolean deleteSoil(Long soilId) throws IMRSACExeption {
        SoilEntity soil = this.soilRepository.findById(soilId);
        soil.getAssociatedAreas().forEach(area -> area.setSoil(null));
        try {
            return this.soilRepository.deleteById(soilId);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_REMOVING_SOIL);
        }
    }
}
