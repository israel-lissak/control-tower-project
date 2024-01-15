CREATE SCHEMA flights_schema;

CREATE TABLE flights_schema.flights (
    flight_id SERIAL PRIMARY KEY,
    flight_number VARCHAR(255),
    departure_point JSON,
    arrival_point JSON,
    current_point JSON,
    pilot_email VARCHAR(255)
);

SELECT * FROM flights_schema.flights;

INSERT INTO flights_schema.flights (flight_number, departure_point, arrival_point, current_point, pilot_email) 
VALUES ('jjj123', '{"height": 3893903, "width": 3770461}', '{"height": 3893903, "width": 3770461}','{"height": 3893903, "width": 3770461}', 'pilot2@gmail.com')
