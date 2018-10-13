export class Plant {
  _id: string;

  // Page 0
  botanicalName?: string;
  commonName: string;
  type: string;
  lifeType: string;
  harvestable: boolean;
  weeksToHarvest?: number;

  // Page 1
  sunSchedule?: string;
  stage?: number;
  variety?: string;
  comment?: string;

  // Page 2 - Advanced settings
  weeksToSowBeforeLastFrost?: number;
  germEnd?: number;

  // Read-only tips
  sowingMethod?: string;
  sowingSpace?: number;
  depth?: number;

  // Not used
  germStart?: number;
  img?: string;
  methodNum?: number;
  zones?: Array<number>;
}
