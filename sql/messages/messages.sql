CREATE TABLE message_status (
    status_id             SMALLINT PRIMARY KEY NOT NULL,
    status_name           VARCHAR(255) NOT NULL
);

insert into message_status (status_id,status_name) VALUES (10,'ACTIVE');
insert into message_status (status_id,status_name) VALUES (20,'DEACTIVE');

CREATE TABLE messages (
    id                    SERIAL PRIMARY KEY,
    message               VARCHAR NOT NULL,
    message_status        INT references message_status NOT NULL
);

insert into messages (message,message_status) VALUES ('Test mesajı', 10);