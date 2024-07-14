package com.imrsac.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.imrsac.dao.entities.irrigation_system.IrrigationSystem;
import com.imrsac.dao.repositories.IrrigationSystemRepository;
import com.imrsac.exceptions.IMRSACErrorEnum;
import com.imrsac.exceptions.IMRSACExeption;
import com.imrsac.models.irrigation_system.UpdateIrrigationSystemRequest;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class IrrigationSystemService {

    @Inject
    private IrrigationSystemRepository irrigationSystemRepository;

    private static Logger LOG = LoggerFactory.getLogger(IrrigationSystemService.class);

    public List<IrrigationSystem> getAllIrrigationSystems() throws IMRSACExeption {
        try {
            return this.irrigationSystemRepository.listAll();
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_FETCHING_IRRIGATION_SYSTEMS);
        }
    }

    public IrrigationSystem createIrrigationSystem(IrrigationSystem system) throws IMRSACExeption {
        try {
            this.irrigationSystemRepository.persist(system);
            return system;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_PERSISTING_IRRIGATION_SYSTEM);
        }
    }

     public IrrigationSystem editIrrigationSystem(Long systemId, UpdateIrrigationSystemRequest request)
            throws IMRSACExeption {
        try {
            IrrigationSystem system = irrigationSystemRepository.findById(systemId);
            system.name = request.getName();
            system.category = request.getCategory();
            system.type = request.getType();
            system.efficiency = request.getEfficiency();
            system.flowRate = request.getFlowRate();
            return system;
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_UPDATING_IRRIGATION_SYSTEM);
        }
    }

    public IrrigationSystem findIrrigationSystemById(Long systemId) throws IMRSACExeption {
        try {
            return this.irrigationSystemRepository.findByIdOptional(systemId)
                    .orElseThrow(() -> new IMRSACExeption(IMRSACErrorEnum.IRRIGATION_SYSTEM_NOT_FOUND_IN_THE_DATABASE));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw e;
        }
    }

    public boolean deleteIrrigationSystem(Long systemId) throws IMRSACExeption {
        try {
            return this.irrigationSystemRepository.deleteById(systemId);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new IMRSACExeption(IMRSACErrorEnum.ERROR_REMOVING_IRRIGATION_SYSTEM);
        }
    }

}
