CREATE SCHEMA control_tower_schema;

CREATE TABLE control_tower_schema.pilots (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    alerts JSON
);

CREATE OR REPLACE FUNCTION add_pilot(
    p_name VARCHAR(255),
    p_email VARCHAR(255),
    p_password VARCHAR(255)
) RETURNS VOID AS $$
BEGIN
    INSERT INTO control_tower_schema.pilots (name, email, password)
    VALUES (p_name, p_email, p_password);
END;
$$ LANGUAGE plpgsql;

INSERT INTO control_tower_schema.pilots (name, email, password, alerts) 
VALUES ('gavi', 'pilot1@gmail.com', '123456','[ { "message": "youre to close", "time": "10:00" }, { "message": "youre to close", "time": "10:00" }]'),
('pedri', 'pilot2@gmail.com', '654321','[ { "message": "youre to close", "time": "10:00" }, { "message": "youre to close", "time": "10:00" }]'),
('arauju', 'pilot3@gmail.com', '123456','[ { "message": "youre to close", "time": "10:00" }, { "message": "youre to close", "time": "10:00" }]'),
('marc guiu', 'pilot4@gmail.com', '654321','[ { "message": "youre to close", "time": "10:00" }, { "message": "youre to close", "time": "10:00" }]')