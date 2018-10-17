export class Plant {
  _id: string;
  botanicalName?: string;
  commonName: string;
  
  type: string = "Cactus" || "Flower" || "Fruit" || "Grain" || "Grass" || "Herb" || "Houseplant" || "Shrub" || "Succulent" || "Vegetable" || "Vine";
  lifeType: string;
  harvestable: boolean;
  weeksToHarvest?: number;

  sunSchedule?: string;
  stage?: number;
  variety?: string;
  comment?: string;

  weeksToSowBeforeLastFrost?: number;
  germEnd?: number;

  sowingMethod?: string;
  sowingSpace?: number;
  depth?: number;

  germStart?: number;
  img?: string;
  methodNum?: number;
  zones?: Array<number>;
}
