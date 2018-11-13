export class SearchFilter {
    type: string = 'Plant Type' || 'Life Cycle' || 'Sun Schedule' || 'Harvestable';
    value: Array<string>;
    isActive: boolean = false;
  }
  