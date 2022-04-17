CREATE TABLE blocked_user_status (
  status_id           SMALLINT PRIMARY KEY NOT NULL,
  status_name         VARCHAR(255) NOT NULL
);

insert into blocked_user_status (status_id,status_name) VALUES (10,'ACTIVE');
insert into blocked_user_status (status_id,status_name) VALUES (20,'DEACTIVE');

CREATE TABLE blocked_users (
   id            	  SERIAL PRIMARY KEY,
   user_name          VARCHAR(255) NOT NULL,
   create_date        timestamptz NOT NULL,
   update_date        timestamptz NOT NULL,
   user_status        INT references blocked_user_status NOT NULL
);

insert into blocked_users (user_name,create_date,update_date,user_status) values('dogan',current_timestamp,current_timestamp,20);