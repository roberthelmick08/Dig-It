export class Plant {
  _id: string;
  botanicalName?: string;
  commonName: string;
  type: string = 'Cactus' || 'Flower' || 'Fruit' || 'Grain' || 'Grass' || 'Herb'
  || 'Houseplant' || 'Shrub' || 'Succulent' || 'Vegetable' || 'Vine';
  lifeType: string = 'Annual' || 'Perennial' || 'Biennial';
  // Whether plant produces something that can be harvested
  harvestable: boolean;
  // Weeks until
  weeksToHarvest?: number;
  sunSchedule?: string;
  stage?: number;
  variety?: string;
  comment?: string;
  weeksToSowBeforeLastFrost?: number;
  // Duration of germination period in weeks
  germEnd?: number;
  // Sowing Tips
  sowingMethod?: string;
  sowingSpace?: number;
  depth?: number;
  isPotted?: boolean;

 /*
* Not Used
*/
  germStart?: number;
  img?: string;
  methodNum?: number;
  zones?: Array<number>;
}
