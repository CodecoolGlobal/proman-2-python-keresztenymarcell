--
-- PostgreSQL database Proman
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET default_tablespace = '';

SET default_with_oids = false;

---
--- drop tables
---

DROP TABLE IF EXISTS statuses CASCADE;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS users;

---
--- create tables
---

CREATE TABLE statuses (
    id       SERIAL PRIMARY KEY     NOT NULL,
    title    VARCHAR(200)           NOT NULL,
    board_id INTEGER                NOT NULL
);

CREATE TABLE boards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    title       VARCHAR(200)        NOT NULL,
    user_id     INTEGER              NULL,
    is_private  INTEGER             NOT NULL
);

CREATE TABLE cards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    board_id    INTEGER             NOT NULL,
    status_id   INTEGER             NOT NULL,
    title       VARCHAR (200)       NOT NULL,
    card_order  INTEGER             NOT NULL
);

CREATE TABLE users(
    id          SERIAL PRIMARY KEY NOT NULL,
    username    VARCHAR (200)       NOT NULL,
    password    VARCHAR (200)       NOT NULL

);

---
--- insert data
---

INSERT INTO statuses(title, board_id) VALUES ('New', 1);
INSERT INTO statuses(title, board_id) VALUES ('In progress', 1);
INSERT INTO statuses(title, board_id) VALUES ('Testing', 1);
INSERT INTO statuses(title, board_id) VALUES ('Done', 1);
INSERT INTO statuses(title, board_id) VALUES ('Archive', 1);
INSERT INTO statuses(title, board_id) VALUES ('New', 2);
INSERT INTO statuses(title, board_id) VALUES ('In progress', 2);
INSERT INTO statuses(title, board_id) VALUES ('Testing', 2);
INSERT INTO statuses(title, board_id) VALUES ('Done', 2);
INSERT INTO statuses(title, board_id) VALUES ('Archive', 2);

INSERT INTO boards(title, user_id, is_private) VALUES ('SCRUM Overlord', null, 0);
INSERT INTO boards(title, user_id, is_private) VALUES ('Web Module', null, 0);


INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 1, 'new card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 1, 'new card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 2, 'in progress card', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 3, 'planning', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 4, 'done card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 4, 'done card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 6, 'new card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 6, 'new card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 7, 'in progress card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 7, 'in progress card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 7, 'in progress card 3', 3);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 7, 'in progress card 4', 4);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 8, 'planning card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 8, 'planning card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 9, 'done card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 9, 'done card 2', 2);

INSERT INTO users(username, password) VALUES ('sajt', 'sajtos');

---
--- add constraints
---

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_board_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_status_id FOREIGN KEY (status_id) REFERENCES statuses(id);

ALTER TABLE ONLY statuses
    ADD CONSTRAINT fk_statuses_board_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY boards
    ADD CONSTRAINT fk_boards_user_id FOREIGN KEY (user_id) REFERENCES  users(id);