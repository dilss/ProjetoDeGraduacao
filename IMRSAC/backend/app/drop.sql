alter table areas
drop foreign key FKb2u2c65a2d9sk2i3424ekcp3f;

alter table areas_coordinates
drop foreign key FKqm60yjg80y0883ew9kcesbrss;

alter table areas_coordinates
drop foreign key FK3elmgaa1bb9eslamae54ckv9a;

drop table if exists areas;

drop table if exists areas_coordinates;

drop table if exists areas_SEQ;

drop table if exists coordinates;

drop table if exists coordinates_SEQ;

drop table if exists soil;

drop table if exists soil_SEQ;