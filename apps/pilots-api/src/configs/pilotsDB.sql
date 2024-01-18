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

create type control_tower_schema.jwt_token as (
  role text,
  exp integer,
  email text
);

create function control_tower_schema.authenticate(
  email text,
  password text
) returns control_tower_schema.jwt_token as $$
declare
  account control_tower_schema.pilots;
begin
  select a.* into account
    from control_tower_schema.pilots as a
    where a.email = authenticate.email;

  if account.password = password then
    return (
      'read_only_role',
      extract(epoch from now() + interval '7 days'),
      account.email
    )::control_tower_schema.jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;

CREATE ROLE read_only_role;
GRANT USAGE ON SCHEMA control_tower_schema TO read_only_role;
GRANT SELECT ON ALL TABLES IN SCHEMA control_tower_schema TO read_only_role;

CREATE ROLE write_only_role;
GRANT USAGE ON SCHEMA control_tower_schema TO write_only_role;
GRANT INSERT, UPDATE, DELETE ON TABLE control_tower_schema.pilots TO write_only_role;
GRANT EXECUTE ON FUNCTION control_tower_schema.authenticate(text, text) TO write_only_role;
GRANT SELECT ON TABLE control_tower_schema.pilots TO write_only_role;
REVOKE SELECT ON TABLE control_tower_schema.pilots FROM write_only_role;