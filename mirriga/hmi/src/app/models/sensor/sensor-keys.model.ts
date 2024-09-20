export interface SensorKeysModel {
  deviceKeys: Keys;
}

export interface Keys {
  devEui: string;
  appKey: string;
  nwkKey: string;
}
