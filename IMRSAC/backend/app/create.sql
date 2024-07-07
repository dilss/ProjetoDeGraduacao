create table areas (created_at datetime(6) not null, id bigint not null, soil_id bigint, name varchar(100) not null, primary key (id)) engine=InnoDB;
create table areas_coordinates (Area_id bigint not null, coordinates_id bigint not null, primary key (Area_id, coordinates_id)) engine=InnoDB;
create table areas_SEQ (next_val bigint) engine=InnoDB;
insert into areas_SEQ values ( 1 );
create table coordinates (latitude decimal(21,18) not null, longitude decimal(21,18) not null, node_order integer not null, created_at datetime(6) not null, id bigint not null, primary key (id)) engine=InnoDB;
create table coordinates_SEQ (next_val bigint) engine=InnoDB;
insert into coordinates_SEQ values ( 1 );
create table soil (cc float(23) not null, density float(23) not null, pmp float(23) not null, id bigint not null, name varchar(100) not null, primary key (id)) engine=InnoDB;
create table soil_SEQ (next_val bigint) engine=InnoDB;
insert into soil_SEQ values ( 1 );
alter table areas_coordinates add constraint UKh1u6b915hf0f5geb1uov857c9 unique (coordinates_id);
alter table areas add constraint FKb2u2c65a2d9sk2i3424ekcp3f foreign key (soil_id) references soil (id);
alter table areas_coordinates add constraint FKqm60yjg80y0883ew9kcesbrss foreign key (coordinates_id) references coordinates (id);
alter table areas_coordinates add constraint FK3elmgaa1bb9eslamae54ckv9a foreign key (Area_id) references areas (id);
