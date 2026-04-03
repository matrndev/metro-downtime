interface Alert {
  id: string;
  cause: string;
  effect: string;
  descriptionText: {
    translation: {
      text: string;
    }[];
  };
}

export default function DowntimeSegment({ alerts }: { alerts: Array<Alert> }) {
    if (alerts.length === 0) {
        return <span className="flex-1 h-8 rounded-sm bg-lime-500"></span>;
    } else {
        return <span className="flex-1 h-8 rounded-sm bg-red-500"></span>;
    }
}