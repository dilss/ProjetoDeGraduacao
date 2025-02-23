import { AgriculturalCrop } from "../agricultural-crop/agricultural-crop.model";
import { Area } from "../area/area.model";
import { IrrigationSystem } from "../irrigation-system/irrigation-system.model";
import { Sensor } from "../sensor/sensor.model";

export class Plantation {
    id?: number;
    name: string;
    area?: Area;
    agriculturalCrop?: AgriculturalCrop;
    irrigationSystem?: IrrigationSystem;
    sensors: Sensor[];
}