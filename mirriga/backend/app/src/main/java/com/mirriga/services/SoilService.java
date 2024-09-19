package com.mirriga.services;

import java.util.List;
import org.jboss.logging.Logger;

import com.mirriga.dao.entities.SoilEntity;
import com.mirriga.dao.repositories.SoilRepository;
import com.mirriga.exceptions.MirrigaErrorEnum;
import com.mirriga.exceptions.MirrigaException;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class SoilService {

    @Inject
    private SoilRepository soilRepository;

    private static final Logger LOG = Logger.getLogger(SoilService.class);

    public List<SoilEntity> getAllSoils() throws MirrigaException {
        try {
            return this.soilRepository.listAll();
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_FETCHING_SOILS);
        }
    }

    public SoilEntity createSoil(SoilEntity soil) throws MirrigaException {
        try {
            this.soilRepository.persist(soil);
            return soil;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            System.out.println(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_PERSISTING_SOIL);
        }
    }

    public SoilEntity findSoilById(Long soilId) throws MirrigaException {
        try {
            return this.soilRepository.findByIdOptional(soilId)
                    .orElseThrow(() -> new MirrigaException(MirrigaErrorEnum.SOIL_NOT_FOUND_IN_THE_DATABASE));
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw e;
        }
    }

    public SoilEntity editSoil(SoilEntity soil) throws MirrigaException {
        try {
            SoilEntity soilEntity = this.soilRepository.findById(soil.id);
            soilEntity.setName(soil.getName());
            soilEntity.setFieldCapacity(soil.getFieldCapacity());
            soilEntity.setPermanentWiltingPoint(soil.getPermanentWiltingPoint());
            soilEntity.setDensity(soil.getDensity());
            return soilEntity;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_UPDATING_SOIL);
        }
    }

    public boolean deleteSoil(Long soilId) throws MirrigaException {
        SoilEntity soil = this.soilRepository.findById(soilId);
        soil.getAssociatedAreas().forEach(area -> area.setSoil(null));
        try {
            return this.soilRepository.deleteById(soilId);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_REMOVING_SOIL);
        }
    }
}
