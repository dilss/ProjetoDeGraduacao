alter table areas drop foreign key FKb2u2c65a2d9sk2i3424ekcp3f;
alter table coordinates drop foreign key FK2frw33nj716h51lchwga63yqy;
alter table plantations drop foreign key FKpm7uwdhda7ivy9n9ignwf8ja5;
alter table plantations drop foreign key FK8474mrtjrtpg5iao7c5cr0cog;
alter table plantations drop foreign key FK7vs8w4h47yik7vmvu32wbksn3;
alter table sensors drop foreign key FKif8um0qo7qtcerahaevbb73hk;
drop table if exists agricultural_crops;
drop table if exists agricultural_crops_SEQ;
drop table if exists areas;
drop table if exists areas_SEQ;
drop table if exists coordinates;
drop table if exists irrigation_systems;
drop table if exists irrigation_systems_SEQ;
drop table if exists plantations;
drop table if exists plantations_SEQ;
drop table if exists sensors;
drop table if exists soil;
drop table if exists soil_SEQ;
