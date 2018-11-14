export class SearchFilter {
    type: string = 'plantType' || 'lifeCycle' || 'sunSchedule';
    value: string;
    isActive?: boolean = false;
  }
  