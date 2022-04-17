CREATE TABLE bonus_status (
    status_id             SMALLINT PRIMARY KEY NOT NULL,
    status_name           VARCHAR(255) NOT NULL
);

insert into bonus_status (status_id,status_name) VALUES (10,'ACTIVE');
insert into bonus_status (status_id,status_name) VALUES (20,'DEACTIVE');

CREATE TABLE bonuses (
    id                  SERIAL PRIMARY KEY,
    bonus_text          VARCHAR(1000) NOT NULL,
    bonus_content       VARCHAR,
    bonus_status        INT references bonus_status NOT NULL
);

insert into bonuses (bonus_text,bonus_content,bonus_status) VALUES ('Test bonusu','<div>Bonus içeriği</div>', 10);
