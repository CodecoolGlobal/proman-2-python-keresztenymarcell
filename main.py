from flask import Flask, render_template, url_for, request
from dotenv import load_dotenv


from util import json_response
import mimetypes
import queries


mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()


@app.route("/")
def index():
    return render_template('index.html')

@app.route("/api/user/boards", defaults={'user_id': None})
@app.route("/api/user/<user_id>/boards")
@json_response
def get_boards(user_id):
    boards = queries.get_boards(user_id)
    return boards


@app.route("/api/boards/<int:user_id>")
@json_response
def get_user_boards(user_id: int):
    return queries.get_user_boards(user_id)


@app.route("/api/boards/<int:board_id>")
@json_response
def get_board_with_id(board_id: int):
    return queries.get_board_with_id(board_id)


@app.route("/api/rename-board-by-id", methods=['POST'])
@json_response
def rename_board_by_id():
    board_id = request.json['board_id']
    board_title = request.json['board_title']
    return queries.rename_board_by_id(board_id, board_title)


@app.route("/api/delete-board-by-id/<int:board_id>", methods=['DELETE'])
@json_response
def delete_board_by_id(board_id: int):
    return queries.delete_board_by_id(board_id)


@app.route("/api/get-columns/")
@json_response
def get_statuses():
    return queries.get_statuses()


@app.route("/api/get-default-columns")
@json_response
def get_default_statuses():
    return queries.get_default_columns()


@app.route("/api/boards/add-default-statuses", methods=["GET", "POST"])
@json_response
def add_default_statuses():
    board_id = request.json["board_id"]
    return queries.add_default_statuses_to_new_board(board_id)


@app.route("/api/board/delete-status-by-id/<int:column_id>", methods=['DELETE'])
@json_response
def delete_status_by_id(column_id: int):
    return queries.delete_status_by_id(column_id)


@app.route("/api/create-new-status", methods=["POST"])
@json_response
def create_new_status():
    title = request.json["title"]
    board_id = request.json["board_id"]
    return queries.create_new_status(title, board_id)


@app.route("/api/get-last-status-id")
@json_response
def get_last_status_id():
    return queries.get_last_status_id()


@app.route("/api/get-last-card-id")
@json_response
def get_last_card_id():
    return queries.get_last_card_id()


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    return queries.get_cards_for_board(board_id)


@app.route("/api/getArchiveIdByBoardId/<int:board_id>")
@json_response
def get_archive_id_by_board_id(board_id: int):
    return queries.get_archive_id_by_board_id(board_id)


@app.route("/api/cards/<int:board_id>/<int:status_id>")
@json_response
def get_card_order_by_board_status_id(board_id: int, status_id: int):
    return queries.get_card_order_by_board_status_id(board_id, status_id)


@app.route("/api/user/board/<int:board_id>/<int:is_private>")
@json_response
def update_user_board_private_status(board_id:int, is_private:int):
    return queries.update_user_boards(board_id, is_private)


@app.route("/api/boards/add-new-board/", methods=["GET", "POST"])
@json_response
def create_new_board():
    board_title = request.json["board_title"]
    user_id = request.json["user_id"]
    private_value = request.json["private_board"]
    return queries.create_board(board_title, user_id, private_value)


@app.route("/api/boards/new-board-id")
@json_response
def get_new_board_id():
    return queries.get_last_board_id()


@app.route("/api/boards/add-new-card/", methods=["GET", "POST"])
@json_response
def create_new_card():
    board_id = request.json["board_id"]
    card_title = request.json["card_title"]
    status_id = request.json["status_id"]
    card_order = request.json["card_order"]
    return queries.create_new_card(board_id, status_id, card_title, card_order)


@app.route("/api/rename-card-by-id", methods=['GET', 'POST'])
@json_response
def rename_card_by_id():
    card_id = request.json['card_id']
    card_title = request.json['card_title']
    return queries.rename_card_by_id(card_id, card_title)


@app.route("/api/delete-card/<int:card_id>", methods=["POST"])
@json_response
def delete_card_by_id(card_id):
    return queries.delete_card_by_id(card_id)


@app.route("/api/rename-column-by-id", methods=['POST'])
@json_response
def rename_statuses_by_id():
    status_id = request.json['column_id']
    status_title = request.json['column_title']
    return queries.rename_statuses_by_id(status_id, status_title)


@app.route("/api/card/<int:status_id>/<int:card_id>/")
@json_response
def update_cards(status_id, card_id):
    return queries.get_update_status(status_id, card_id)


@app.route("/api/login", methods=["GET", "POST"])
@json_response
def login():
    username = request.json['username']
    psw = request.json['password']
    user_password = queries.get_password(username)['password']
    is_valid_user = queries.verify_password(psw, user_password)
    return is_valid_user


@app.route("/api/registration/register-user", methods=['POST'])
@json_response
def register_user():
    username = request.json['username']
    psw = request.json['psw']
    is_existing_user = queries.check_user(username)
    # is_existing_user = str(is_existing_user).lower()
    return_object_existing = {'response': is_existing_user}
    if is_existing_user:
        return return_object_existing
    queries.register_user(username, psw) # should return false if registration was successful
    return_object_reg = {'response': False}
    return return_object_reg


@app.route("/api/me/<string:username>", methods=["GET", "POST"])
@json_response
def get_user_id_by_name(username):
    return queries.get_userid_by_name(username)


@app.route("/api/board/<int:board_id>/statuses", methods=["GET", "POST"])
@json_response
def get_archive_status_id(board_id):
    return queries.get_archive_by_board_id(board_id)


def main():
    app.run(debug=True)
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
