from flask import Flask, render_template, url_for, request, redirect, session
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


@app.route("/api/boards")
@json_response
def get_boards():
    return queries.get_boards()


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


@app.route("/api/cards/<int:board_id>/<int:status_id>")
@json_response
def get_card_order_by_board_status_id(board_id: int, status_id: int):
    return queries.get_card_order_by_board_status_id(board_id, status_id)


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
    return queries.get_all_user_data()


@app.route("/api/me/<string:username>", methods=["GET", "POST"])
@json_response
def get_user_id_by_name(username):
    return queries.get_userid_by_name(username)


def main():
    app.run(debug=True)
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
