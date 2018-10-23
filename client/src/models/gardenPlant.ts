import { Reminder } from './reminder';

export class GardenPlant {

/*
* Plant Attributes
*/
  _id: string;
  botanicalName?: string;
  commonName: string;
  type: string = 'Cactus' || 'Flower' || 'Fruit' || 'Grain' || 'Grass' ||
  'Herb' || 'Houseplant' || 'Shrub' || 'Succulent' || 'Vegetable' || 'Vine';
  lifeType: string = 'Annual' || 'Perennial' || 'Biennial';
  sunSchedule?: string;
  variety?: string;
  comment?: string;
  // Duration of germination period in weeks
  germEnd?: number;
  // Sowing Tips
  sowingSpace?: number;
  depth?: number;
  methodNum?: number;
  zones?: Array<number>;

  /*
  * Additional Fields - Garden Plant
  */
 reminders: Array<Reminder>;
 stage: number;
 isPotted?: boolean;

 /*
 * Not Used
 */
 img?: string;
 weeksToHarvest?: number;
 weeksToSowBeforeLastFrost?: number;
 harvestable: boolean;
 germStart?: number;
 sowingMethod?: string;
}
