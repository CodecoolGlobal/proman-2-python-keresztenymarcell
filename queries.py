import data_manager, bcrypt

from psycopg2 import sql


def get_card_status(status_id):
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})
    return status


def get_boards(user_id):
    if user_id is not None:
        query = """
            SELECT * FROM boards
            WHERE is_private = 0 OR user_id = {user_id}
            ORDER BY id
            ;
            """
        return data_manager.execute_select(sql.SQL(query).format(user_id=sql.Literal(user_id)))
    else:
        query = """
            SELECT * FROM boards
            WHERE is_private = 0
            ORDER BY id
            ;
            """
        return data_manager.execute_select(query)


def get_user_boards(user_id):
    userBoards = data_manager.execute_select(
        """
        SELECT * FROM boards
        WHERE user_id = %(user_id)s
        ;
        """
        , {"user_id": user_id})
    return userBoards


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def get_card_order_by_board_status_id(board_id, status_id):
    result = data_manager.execute_select(
        """
        SELECT MAX(card_order) as card_order FROM cards
        WHERE board_id = %(board_id)s AND status_id = %(status_id)s
        """,
        {"board_id": board_id, "status_id": status_id}
    )
    return result[0]["card_order"]


def get_board_with_id(board_id):
    return data_manager.execute_select(
        """
        SELECT *
        FROM boards
        WHERE boards.id = %(board_id)s
        ;
        """
        , {"board_id": board_id}
    )


def get_statuses():
    return data_manager.execute_select(
        """
        SELECT id, title, board_id FROM statuses
        ORDER BY id 
        """
    )


def get_archive_id_by_board_id(board_id):
    return data_manager.execute_select(
        """
        SELECT id 
        FROM statuses
        WHERE board_id = %(board_id)s AND title = 'Archive'
        """
        , {"board_id": board_id}
    )


def create_new_status(title, board_id):
    return data_manager.execute_query(
        """
        INSERT INTO statuses (title, board_id) 
        VALUES (%(title)s, %(board_id)s) 
        RETURNING id
        """,
        {"title": title, "board_id": board_id}
    )


def get_last_status_id():
    return data_manager.execute_select(
        """
        SELECT MAX(id) 
        FROM statuses
        """
    )


def rename_board_by_id(id, title):
    return data_manager.execute_query(
        """
        UPDATE boards 
        SET title = %(title)s
        WHERE id = %(id)s
        """,
        {"id": id, "title": title}
    )


def create_board(title, user_id, is_private):
    return data_manager.execute_query(
        """
            INSERT INTO boards (title, user_id, is_private) 
            VALUES (%(title)s, %(user_id)s, %(is_private)s) RETURNING (id);
        """, {"title": title, "user_id": user_id, "is_private": is_private})


def get_last_board_id():
    result = data_manager.execute_select(
        """
        SELECT MAX(id) AS id FROM boards;
        """
    )
    return result[0]["id"]


def get_last_status_id():
    result = data_manager.execute_select(
        """
        SELECT MAX(id) AS id FROM statuses;
        """
    )
    return result[0]["id"]


def create_new_card(board_id, status_id, title, card_order):
    return data_manager.execute_query(
        """
            INSERT INTO cards (board_id, status_id, title, card_order) 
            VALUES (%(board_id)s , %(status_id)s, %(title)s, %(card_order)s);
        """,
        {"board_id": board_id, "status_id": status_id, "title": title, "card_order": card_order}
    )


def get_last_card_id():
    result = data_manager.execute_select(
        """
        SELECT MAX(id) AS id FROM cards;
        """
    )
    return result[0]["id"]


def get_default_columns():
    return data_manager.execute_select(
        """
        SELECT id, title FROM statuses
        WHERE id >= 1 AND id <=4;
        """
    )


def add_default_statuses_to_new_board(board_id):
    return data_manager.execute_query(
        """
            INSERT INTO statuses (title, board_id) 
            VALUES 
            ('New', %(board_id)s),
            ('In progress', %(board_id)s),
            ('Testing', %(board_id)s),
            ('Done', %(board_id)s),
            ('Archive', %(board_id)s);

        """, {"board_id": board_id}
    )


def rename_card_by_id(id, title):
    return data_manager.execute_query(
        """
        UPDATE cards 
        SET title = %(title)s
        WHERE id = %(id)s
        """,
        {"id": id, "title": title}
    )


def delete_card_by_id(card_id):
    return data_manager.execute_query(
        """
        DELETE FROM cards
        WHERE id = %(card_id)s
        """,
        {"card_id": card_id}
    )


def rename_statuses_by_id(id, title):
    return data_manager.execute_query(
        """
        UPDATE statuses 
        SET title = %(title)s
        WHERE id = %(id)s
        """,
        {"id": id, "title": title}
    )


def delete_board_by_id(board_id):
    delete_board_id_from_cards(board_id)
    delete_board_id_from_statuses(board_id)
    delete_board(board_id)


def delete_status_by_id(column_id):
    delete_status_id_from_cards(column_id)
    delete_status(column_id)


def delete_board(board_id):
    return data_manager.execute_query(
        """
        DELETE FROM boards
        WHERE
        id = %(id)s;
        """,
        {"id": board_id}
    )


def delete_board_id_from_cards(board_id):
    return data_manager.execute_query(
        """
        DELETE FROM cards
        WHERE board_id = %(id)s;
        """,
        {"id": board_id}
    )


def delete_board_id_from_statuses(board_id):
    return data_manager.execute_query(
        """
        DELETE FROM statuses
        WHERE board_id = %(id)s;
        """,
        {"id": board_id}
    )


def delete_status_id_from_cards(status_id):
    return data_manager.execute_query(
        """
        DELETE FROM cards
        WHERE status_id = %(id)s;
        """,
        {"id": status_id}
    )


def delete_status(status_id):
    return data_manager.execute_query(
        """
        DELETE FROM statuses
        WHERE id = %(id)s;
        """,
        {"id": status_id}
    )


def get_update_status(status_id, card_id):
    return data_manager.execute_query(
        """
        UPDATE cards
        SET
         status_id = %(status_id)s
        WHERE id = %(card_id)s
        """, {"status_id": status_id, "card_id": card_id}
    )


def get_password(username):
    return data_manager.execute_select(
        """
        SELECT password FROM users WHERE username = %(username)s
        """, {'username': username}, fetchall=False
    )


def check_user(username):
    query = """
            SELECT username FROM users
            WHERE username = %(username)s"""
    user = data_manager.execute_select(query, {"username": username}, fetchall=False)
    return True if user is not None else False


def register_user(username, password):
    password = hash_password(password)
    query = """
            INSERT INTO users (username, password)
            VALUES (%(username)s, %(password)s)"""
    return data_manager.execute_query(query, {'username': username, 'password': password})


def get_userid_by_name(username):
    return data_manager.execute_select(
        """
        SELECT id FROM users
        WHERE username = %(username)s
        """, {'username': username}
)


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)
