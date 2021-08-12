import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """
    # remove this code once you implement the database

    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


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
    data_manager.execute_select(
        """
        SELECT MAX(card_order) as id FROM cards
        WHERE board_id = %(board_id)s AND status_id = %(status_id)s
        """,
        {"board_id": board_id, "status_id": status_id}
    )


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


def create_element(title):
    return data_manager.execute_query(
        """
            INSERT INTO boards (title) VALUES (%(title)s) RETURNING (id);
        """, {"title": title}
    )


def get_last_board_id():
    return data_manager.execute_select(
        """
        SELECT MAX(id) AS id FROM boards;
        """
    )


def create_new_card(board_id, status_id, title, card_order):
    return data_manager.execute_query(
        """
            INSERT INTO cards (board_id, status_id, title, card_order) 
            VALUES (%(board_id)s , %(status_id)s, %(title)s, %(card_order)s);
        """,
        {"board_id": board_id, "status_id": status_id, "title": title, "card_order": card_order}
    )


def get_last_card_id():
    return data_manager.execute_select(
        """
        SELECT MAX(id) AS id FROM cards;
        """
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