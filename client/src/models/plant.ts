export class Plant {
  botanicalName?: string;
  commonName: string;
  lifeType: string;
  type: string;
  harvestable: boolean;
  sunSchedule?: string;
  stage?: number;
  variety?: string;
  zones?: Array<number>;

  timeRecs: {
    germStart?: number;
    germEnd?: number;
    weeksToSowBeforeLastFrost?: number;
    weeksToHarvest?: number;
  };

  tips: {
    depth?: number;
    sowingMethod?: string,
    sowingSpace?: number,
    comment?: string,
  };
  // Not used
  img?: string;
  methodNum?: number;
}
