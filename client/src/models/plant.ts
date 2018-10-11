export class Plant {
  // Page 1
  botanicalName?: string;
  commonName: string;
  type: string;
  lifeType: string;
  harvestable: boolean;

  // Page 2
  sunSchedule?: string;
  stage?: number;
  variety?: string;

  // Page 3
  timeRecs: {
    weeksToSowBeforeLastFrost?: number;
    germStart?: number;
    germEnd?: number;
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
  zones?: Array<number>;
}
