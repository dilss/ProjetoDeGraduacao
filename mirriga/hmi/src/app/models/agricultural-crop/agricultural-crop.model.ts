import { Plantation } from "../plantation/plantation.model";

export class AgriculturalCrop {
    id?: number;
    name: string;
    rootDepth: number;
    waterAvailabilityFactor: number;
    cicleDurationDays: number;
    durationPercentagePhaseOne: number;
    durationPercentagePhaseTwo: number;
    durationPercentagePhaseThree: number;
    durationPercentagePhaseFour: number;
    plantations?: Plantation[];   
}