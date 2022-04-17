CREATE TABLE user_type (
    type_id           SMALLINT PRIMARY KEY NOT NULL,
    type_name         VARCHAR(255) NOT NULL
);

insert into user_type (type_id,type_name) VALUES (10,'ADMIN');
insert into user_type (type_id,type_name) VALUES (20,'EDITOR');

CREATE TABLE user_status (
    status_id           SMALLINT PRIMARY KEY NOT NULL,
    status_name         VARCHAR(255) NOT NULL
);

insert into user_status (status_id,status_name) VALUES (10,'ACTIVE');
insert into user_status (status_id,status_name) VALUES (20,'DEACTIVE');

CREATE TABLE users (
    id            	  SERIAL PRIMARY KEY,
    login_name        VARCHAR(255) NOT NULL,
    password		  VARCHAR(255) NOT NULL,
    user_name         VARCHAR(255) NOT NULL,
    user_surname      VARCHAR(255),
    email             VARCHAR(255),
    phone             VARCHAR(255),
    user_type		  SMALLINT references user_type NOT NULL,
    user_status		  SMALLINT references user_status NOT NULL,
    create_date       timestamptz NOT NULL,
    update_date       timestamptz NOT NULL
);

CREATE TABLE user_bonus_permissions (
    user_id           INT references users NOT NULL,
    bonus_id          INT references bonuses NOT NULL
);

insert into users (login_name,password,user_name,user_type,user_status,create_date,update_date) VALUES('admin','admin','Admin User',10,10,current_timestamp,current_timestamp);
insert into users (login_name,password,user_name,user_type,user_status,create_date,update_date) VALUES('editor','editor','Editor',20,10,current_timestamp,current_timestamp);

CREATE TABLE sessions (
    user_id			  INT references users,
    jwt_token		  VARCHAR NOT NULL,
    create_date       timestamptz NOT NULL
);
