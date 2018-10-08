export class Plant {
  botanicalName?: string;
  commonName: String;
  stage?: Number;
  comment?: String;
  depth?: Number;
  germStart?: Number;
  germEnd?: Number;
  harvestable: Boolean;
  img?: String;
  lifeType: String;
  methodNum?: Number;
  sowingMethod?: String;
  sowingSpace?: Number;
  sunSchedule?: String;
  type: String;
  weeksToHarvest?: Number;
  weeksToSowBeforeLastFrost?: Number;
  variety?: String;
  zones?: Array<Number>;
}
