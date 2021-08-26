export let dataHandler = {
    getBoards: async function (userId) {
        let response;
        if (userId !== null) {
            response = await apiGet(`/api/user/${userId}/boards`);
        } else {
            response = await apiGet(`/api/user/boards`);
        }
        return response;
    },
    getUserBoards: async function (userId) {
        const response = await apiGet(`/api/boards/${userId}`);
        return response;
    },
    getBoard: async function (boardId) {
        const response = await apiGet(`/api/boards/${boardId}`);
        return response;
    },
    getColumns: async function () {
        const response = await apiGet(`/api/get-columns`);
        return response;
    },
    getStatus: async function (statusId) {
    },
    getNewBoardId: async function () {
        const response = await apiGet("/api/boards/new-board-id");
        return response;
    },
    createNewStatus: async function (title, boardID) {
        let payload = {"title": title, "board_id": boardID}
        await apiPost(`/api/create-new-status`, payload)
    },
    getLastStatusId: async function () {
        const response = await apiGet(`/api/get-last-status-id`)
        return response
    },
    getLastCardId: async function () {
        const response = await apiGet(`api/get-last-card-id`)
        return response
    },
    getCardsByBoardId: async function (boardId) {
        const response = await apiGet(`/api/boards/${boardId}/cards/`);
        return response;
    },
    getCardOrderByBoardColumnId: async function (boardId, statusId) {
        const response = await apiGet(`/api/cards/${boardId}/${statusId}`)
        return response
    },
  getUserId: async function(username){
      const response = await apiGet(`/api/me/${username}`)
      return response
  },
    getCard: async function (cardId) {
        //
  },
    getArchiveIdByBoard: async function (boardId) {
        const response = await apiGet(`/api/getArchiveIdByBoardId/${boardId}`)
        return response
    },
    renameBoard: async function (boardId, boardTitle) {
        let payload = {"board_id": boardId, "board_title": boardTitle}
        await apiPost(`/api/rename-board-by-id`, payload)
    },
    renameCard: async function (cardId, cardTitle) {
        let payload = {"card_id": cardId, "card_title": cardTitle}
        await apiPost("/api/rename-card-by-id", payload)
    },
    renameColumn: async function (columnId, columnTitle) {
        let payload = {"column_id": columnId, "column_title": columnTitle}
        await apiPost("/api/rename-column-by-id", payload)
    },
    createNewBoard: async function (boardTitle, userID, privateBoard) {
    let payload = {"board_title": boardTitle, "user_id":userID, "private_board":privateBoard}
    await apiPost("/api/boards/add-new-board/", payload)
  },
    createNewCard: async function (boardId, cardTitle, statusId, cardOrder) {
        let payload = {"board_id": boardId, "card_title": cardTitle, "status_id": statusId, "card_order": cardOrder}
        await apiPost("/api/boards/add-new-card/", payload)
    },
    deleteCardById: async function (cardId) {
        let payload = {"card_id": cardId}
        await apiPost(`/api/delete-card/${cardId}`)
    },
    deleteBoardById: async function (boardId) {
        let payload = {"board_id": boardId}
        await apiDelete(`/api/delete-board-by-id/${boardId}`, payload)
    },
    deleteStatusById: async function (statusId) {
        let payload = {"status_id": statusId}
        await apiDelete(`/api/board/delete-status-by-id/${statusId}`, payload)
    },
    createEmptyStatuses: async function (boardId) {
        let payload = {"board_id": boardId}
        await apiPost("/api/boards/add-default-statuses", payload)
    },
    updateCards: async function (status_id, card_id) {
        const response = await apiGet(`/api/card/${status_id}/${card_id}/`);
        return response;
    },
    updateBoardPrivateStatus: async function (board_id,is_private) {
        const response = await apiGet(`/api/user/board/${board_id}/${is_private}`);
        return response;
    },
    registerUser: async function (registrationData) {
        const response = await apiPost("/api/registration/register-user", registrationData);
        return response.response
    },
    getLogin: async function (userDataToCheck) {
      const response = await apiPost(`/api/login`, userDataToCheck);
      return response;
    },
    getArchiveStatusId: async function(board_id){
      const response = await apiGet(`/api/board/${board_id}/statuses`)
      return response
  },
};


async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.status === 200) {
        return response.json()
    }
}


async function apiPost(url, payload) {
    let response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
    });
    if (response.status === 200) {
        return response.json()
    }
}


async function apiDelete(url, payload = "") {
    await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(payload)
    })
}


async function apiPut(url, payload = "") {
    await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(payload)
    })
}
