CREATE TABLE bonus_request_status (
    status_id             SMALLINT PRIMARY KEY NOT NULL,
    status_name           VARCHAR(255) NOT NULL
);

insert into bonus_request_status (status_id,status_name) VALUES (10,'WAITING');
insert into bonus_request_status (status_id,status_name) VALUES (20,'ACCEPTED');
insert into bonus_request_status (status_id,status_name) VALUES (30,'REJECTED');
insert into bonus_request_status (status_id,status_name) VALUES (40,'OTHER');

CREATE TABLE bonus_requests (
    id                SERIAL PRIMARY KEY,
    user_name         VARCHAR(255) NOT NULL,
    bonus_id          INT references bonuses NOT NULL,
    create_date       timestamptz NOT NULL,
    process_date      timestamptz NOT NULL,
    note              VARCHAR,
    message_id        INT references messages,
    request_status    INT references bonus_request_status NOT NULL
);

insert into bonus_requests (user_name,bonus_id,create_date,process_date,request_status)
values ('dogan',1,current_timestamp,current_timestamp,10);