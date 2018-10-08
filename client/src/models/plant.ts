export class Plant {
  botanicalName?: string;
  commonName: string;
  stage?: number;
  comment?: string;
  depth?: number;
  germStart?: number;
  germEnd?: number;
  harvestable: boolean;
  img?: string;
  lifeType: string;
  methodNum?: number;
  sowingMethod?: string;
  sowingSpace?: number;
  sunSchedule?: string;
  type: string;
  weeksToHarvest?: number;
  weeksToSowBeforeLastFrost?: number;
  variety?: string;
  zones?: Array<number>;
}
