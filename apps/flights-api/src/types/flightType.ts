export type FlightType = {
    flight_id: number;
    flight_number: string;
    departure_point: {
      height: number;
      width: number;
    };
    arrival_point: {
      height: number;
      width: number;
    };
    current_point: {
      height: number;
      width: number;
    };
    pilot_email: string;
  };
