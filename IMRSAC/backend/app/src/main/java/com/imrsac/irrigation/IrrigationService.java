package com.imrsac.irrigation;

import com.imrsac.dao.entities.PlantationEntity;
import com.imrsac.exceptions.IMRSACExeption;
import com.imrsac.services.PlantationService;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;

@RequestScoped
public class IrrigationService {

    @Inject
    private PlantationService plantationService;

    /*
     * CAD = (CC - PMP) x d/10
     * Em que:
     * 
     * CC = Conteúdo de água disponível no solo na capacidade de campo (% peso -
     * g/g)
     * PMP = Conteúdo de água disponível no solo no ponto de murcha permanente (%
     * peso - g/g)
     * d = Densidade do solo (g de solo / cm³ de solo)
     */
    public Float getCAD(PlantationEntity plantation) throws IMRSACExeption {
        Float fieldCapacity = plantation.getArea().getSoil().getFieldCapacity();
        Float permanentWiltingPoint = plantation.getArea().getSoil().getPermanentWiltingPoint();
        Float soilDensity = plantation.getArea().getSoil().getDensity();
        return (fieldCapacity - permanentWiltingPoint) * soilDensity / 10;
    }

    /*
     * LL = CAD x f x Z
     * 
     * Em que:
     * LL = Lâmina Liquida de água em mm (L/m²)
     * CAD = Capacidade de água total disponível no solo (mm de água/cm de solo)
     * f = Coeficiente de disponibilidade de água (característica da cultura - 0 < f
     * < 1)
     * Z = Profundidade do sistema radicular da cultura (cm)
     */
    public Double getLL(PlantationEntity plantation) throws IMRSACExeption {
        Double availabilityCoeficient = plantation.getAgriculturalCrop().getWaterAvailabilityFactor();
        Long rootDepth = plantation.getAgriculturalCrop().getRootDepth();
        Float cad = this.getCAD(plantation);
        return cad * availabilityCoeficient * rootDepth;
    }

    /*
     * LB = ITN = LL/E
     * Em que:
     * 
     * LB = Lâmina Bruta de Irrigação (mm)
     * ITN = Irrigação Total Necessária (mm)
     * E = Eficiência do sistema de irrigação (0 < E < 1) 
     */
    public Double getLB(PlantationEntity plantation) throws IMRSACExeption {
        Double systemEficiency = plantation.getIrrigationSystem().getEfficiency();
        return this.getLL(plantation) / systemEficiency;
    }

    /*
     * Tempo de Aplicação = LB/(Vazão/Área) em horas
     * Em que:
     * 
     * Vazão = Vazão média do sistema de irrigação (L/h)
     * Área = Área de plantio (m²)
     * 
     * A grandeza Vazão/Área é chamada de Intensidade de Aplicação(IA) e é dada em mm/h
     */
    // public Double calculateIrrigation(Long sensorEui) throws IMRSACExeption {


        



    //     Plantation plantation = plantationService.
    //     Long flowRate = plantation.irrigationSystem.flowRate;
    //     Double area = plantation.area.area;
    //     var irrigationIntensity = flowRate / area;
    //     return getLB(plantation) / irrigationIntensity;
    // }
}
