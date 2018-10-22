import { Reminder } from './reminder';

export class GardenPlant {

/*
* Additional Fields - Garden Plant
*/
reminders: Array<Reminder>;
stage: number;

/*
* Plant Attributes
*/
  botanicalName?: string;
  commonName: string;
  type: string = 'Cactus' || 'Flower' || 'Fruit' || 'Grain' || 'Grass' ||
  'Herb' || 'Houseplant' || 'Shrub' || 'Succulent' || 'Vegetable' || 'Vine';
  lifeType: string = 'Annual' || 'Perennial' || 'Biennial';
  // Weeks until
  sunSchedule?: string;
  variety?: string;
  comment?: string;
  // Duration of germination period in weeks
  germEnd?: number;
  // Sowing Tips
  sowingSpace?: number;
  depth?: number;
  methodNum?: number;

  img?: string;
  zones?: Array<number>;


  /*
  * Not Used
  */
 weeksToHarvest?: number;
 weeksToSowBeforeLastFrost?: number;
 harvestable: boolean;



 germStart?: number;
 sowingMethod?: string;
}
