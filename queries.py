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

def create_new_card(board_id, status_id, title):
    return data_manager.execute_query(
        """
            INSERT INTO cards (board_id, status_id, title, card_order) 
            VALUES (%(board_id)s , %(status_id)s, %(title)s, 0);
        """, {"board_id": board_id, "status_id": status_id, "title": title}
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


def rename_statuse_by_id(id, title):
    return data_manager.execute_query(
        """
        UPDATE statuses 
        SET title = %(title)s
        WHERE id = %(id)s
        """,
        {"id": id, "title": title}
    )
