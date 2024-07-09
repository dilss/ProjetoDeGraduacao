create table
    areas (
        created_at datetime (6) not null,
        id bigint not null,
        soil_id bigint,
        name varchar(100) not null,
        primary key (id)
    ) engine = InnoDB;

create table
    areas_SEQ (next_val bigint) engine = InnoDB;

insert into
    areas_SEQ
values
    (1);

create table
    coordinates (
        latitude decimal(21, 18) not null,
        longitude decimal(21, 18) not null,
        area_id bigint not null,
        created_at datetime (6) not null,
        node_order bigint not null,
        primary key (area_id, node_order)
    ) engine = InnoDB;

create table
    soil (
        cc float (23) not null,
        density float (23) not null,
        pmp float (23) not null,
        id bigint not null,
        name varchar(100) not null,
        primary key (id)
    ) engine = InnoDB;

create table
    soil_SEQ (next_val bigint) engine = InnoDB;

insert into
    soil_SEQ
values
    (1);

alter table areas add constraint FKb2u2c65a2d9sk2i3424ekcp3f foreign key (soil_id) references soil (id);

alter table coordinates add constraint FK2frw33nj716h51lchwga63yqy foreign key (area_id) references areas (id);