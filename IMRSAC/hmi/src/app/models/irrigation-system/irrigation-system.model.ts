import { Plantation } from "../plantation/plantation.model";

export class IrrigationSystem {
  id?: number;
  name: string;
  category: string;
  type: string;
  efficiency: number;
  flowRate: number;
  plantation?: Plantation;
}
