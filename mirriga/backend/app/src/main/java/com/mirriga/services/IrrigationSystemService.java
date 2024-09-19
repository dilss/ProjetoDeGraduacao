package com.mirriga.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mirriga.dao.entities.IrrigationSystemEntity;
import com.mirriga.dao.repositories.IrrigationSystemRepository;
import com.mirriga.exceptions.MirrigaErrorEnum;
import com.mirriga.exceptions.MirrigaException;
import com.mirriga.models.IrrigationSystemRequestDto;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class IrrigationSystemService {

    @Inject
    private IrrigationSystemRepository irrigationSystemRepository;

    private static Logger LOG = LoggerFactory.getLogger(IrrigationSystemService.class);

    public List<IrrigationSystemEntity> getAllIrrigationSystems() throws MirrigaException {
        try {
            return this.irrigationSystemRepository.listAll();
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_FETCHING_IRRIGATION_SYSTEMS);
        }
    }

    public IrrigationSystemEntity createIrrigationSystem(IrrigationSystemEntity system) throws MirrigaException {
        try {
            this.irrigationSystemRepository.persist(system);
            return system;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_PERSISTING_IRRIGATION_SYSTEM);
        }
    }

     public IrrigationSystemEntity editIrrigationSystem(Long systemId, IrrigationSystemRequestDto request)
            throws MirrigaException {
        try {
            IrrigationSystemEntity system = irrigationSystemRepository.findById(systemId);
            system.setName(request.getName());
            system.setCategory(request.getCategory());
            system.setType(request.getType());
            system.setEfficiency(request.getEfficiency());
            system.setFlowRate(request.getFlowRate());
            return system;
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_UPDATING_IRRIGATION_SYSTEM);
        }
    }

    public IrrigationSystemEntity findIrrigationSystemById(Long systemId) throws MirrigaException {
        try {
            return this.irrigationSystemRepository.findByIdOptional(systemId)
                    .orElseThrow(() -> new MirrigaException(MirrigaErrorEnum.IRRIGATION_SYSTEM_NOT_FOUND_IN_THE_DATABASE));
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw e;
        }
    }

    public boolean deleteIrrigationSystem(Long systemId) throws MirrigaException {
        try {
            return this.irrigationSystemRepository.deleteById(systemId);
        } catch (Exception e) {
            LOG.debug(e.getMessage());
            throw new MirrigaException(MirrigaErrorEnum.ERROR_REMOVING_IRRIGATION_SYSTEM);
        }
    }

}
