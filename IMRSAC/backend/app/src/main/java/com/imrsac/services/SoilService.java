package com.imrsac.services;

import java.util.List;

import org.jboss.logging.Logger;

import com.imrsac.dao.entities.soil.Soil;
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


    public List<Soil> getAllSoils() throws IMRSACExeption {
         try {
            return this.soilRepository.listAll();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_FETCHING_SOILS);
        }
    }

     public Long createSoil(Soil soil) throws IMRSACExeption {
        try {
            this.soilRepository.persist(soil);
            return soil.id;
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

    public boolean deleteSoil(Long soilId) throws IMRSACExeption {
        try {
            return this.soilRepository.deleteById(soilId);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_REMOVING_SOIL);
        }
    }

}
