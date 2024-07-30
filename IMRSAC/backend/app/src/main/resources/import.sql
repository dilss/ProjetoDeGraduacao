-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;


-- -- Permite ao keycloak inicializar com sucesso usando o banco de dados 'keycloak_db'
-- GRANT ALL PRIVILEGES
-- ON keycloak_db.*
-- TO 'dilss'@'%'
-- -- WITH GRANT OPTION;