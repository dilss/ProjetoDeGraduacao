
    create table areas (
        created_at datetime(6) not null,
        id bigint not null,
        name varchar(100) not null,
        primary key (id)
    ) engine=InnoDB;

    create table areas_SEQ (
        next_val bigint
    ) engine=InnoDB;

    insert into areas_SEQ values ( 1 );

    create table coordinates (
        latitude decimal(21,18) not null,
        longitude decimal(21,18) not null,
        node_order integer not null,
        area_id bigint,
        created_at datetime(6) not null,
        id bigint not null,
        primary key (id)
    ) engine=InnoDB;

    create table coordinates_SEQ (
        next_val bigint
    ) engine=InnoDB;

    insert into coordinates_SEQ values ( 1 );

    create table soil (
        cc float(23) not null,
        density float(23) not null,
        pmp float(23) not null,
        id bigint not null,
        name varchar(100) not null,
        primary key (id)
    ) engine=InnoDB;

    create table soil_SEQ (
        next_val bigint
    ) engine=InnoDB;

    insert into soil_SEQ values ( 1 );

    alter table coordinates 
       add constraint FK2frw33nj716h51lchwga63yqy 
       foreign key (area_id) 
       references areas (id);
