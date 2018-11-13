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
  img?: string;
  weeksToHarvest?: number;
  weeksToSowBeforeLastFrost?: number;
  harvestable: boolean;

  // Sowing Tips
  sowingSpace?: number;
  depth?: number;
  methodNum?: number;

  /*
  * Additional Fields - Garden Plant
  */
 reminders: Array<Reminder>;
 stage: number;
 isPotted?: boolean;

 /*
 * Not Used
 */
 germStart?: number;
 germEnd?: number;
 sowingMethod?: string;
 zones?: Array<number>;
}
