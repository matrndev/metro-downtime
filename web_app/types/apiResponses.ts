export interface Alert {
  id: string;
  cause: string;
  effect: string;
  lastUpdated: number;
  informedEntity: {
    routeId: string;
  }[];
  activePeriod: {
    start: number;
    end?: number;
  }[];
  headerText: {
    translation: {
        text: string;
    }[];
  };
  descriptionText: {
    translation: {
      text: string;
    }[];
  };
  url: {
    translation: {
      text: string;
    }[];
  };
}