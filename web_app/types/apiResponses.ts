export interface Alert {
  id: string;
  cause: string;
  effect: string;
  lastUpdated: number;
  wasOrphaned: boolean;
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

export enum RouteType {
  Tram,
  Subway,
  Rail,
  Bus,
  Ferry,
  CableTram,
  AerialLift,
  Funicular,
  Trolleybus = 11,
  Monorail = 12
}

export interface RouteInfo {
  route_id: string;
  agency_id: string;
  route_short_name: string;
  route_long_name: string;
  route_type: RouteType;
  route_url: string;
  route_color: string;
  route_text_color: string;
  is_night: boolean;
  is_regional: boolean;
  is_substitute_transport: boolean;
}