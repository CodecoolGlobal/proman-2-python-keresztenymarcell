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


def get_statuses(board_id):
    return data_manager.execute_select(
        """
        SELECT DISTINCT statuses.id, statuses.title FROM statuses
        JOIN cards c on statuses.id = c.status_id
        JOIN boards b on b.id = c.board_id
        WHERE board_id = %(board_id)s
        
        ;
        """, {"board_id": board_id}
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


def delete_board_by_id(board_id):
    # Elsőször a card utána a többi törlése, másképp hibára fut
    # MINDEN HIBÁRA IGAZ
    delete_board_id_from_cards(board_id)
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