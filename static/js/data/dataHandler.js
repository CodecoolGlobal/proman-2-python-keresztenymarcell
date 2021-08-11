export let dataHandler = {
  getBoards: async function () {
    const response = await apiGet("/api/boards");
    return response;
  },
  getBoard: async function (boardId) {
    const response = await apiGet(`/api/boards/${boardId}`);
    return response;
  },
  getStatuses: async function (boardId) {
   const response = await apiGet(`/api/board/${boardId}/column`);
   return response;
  },
  getStatus: async function (statusId) {

  },
  getNewBoardId: async function () {
    const response = await apiGet("/api/boards/new-board-id/");
    return response;
  },

  getCardsByBoardId: async function (boardId) {
    const response = await apiGet(`/api/boards/${boardId}/cards/`);
    return response;
  },
  getCard: async function (cardId) {
      //
  },

  renameBoard: async function(boardId, boardTitle){
    let payload = {"board_id": boardId, "board_title": boardTitle}
    await apiPost(`/api/rename-board-by-id`, payload)
  },

  renameCard: async function(cardId, cardTitle){
    let payload = {"card_id": cardId, "card_title": cardTitle}
    await apiPost("/api/rename-card-by-id", payload)
  },

  renameColumn: async function(columnId, columnTitle){
    let payload = {"column_id": columnId, "column_title": columnTitle}
    await apiPost("/api/rename-column-by-id", payload)
  },


  createNewBoard: async function (boardTitle) {
    let payload = {"board_title": boardTitle}
    await apiPost("/api/boards/add-new-board/", payload)
  },
  createNewCard: async function ( boardId, cardTitle, statusId) {
    let payload = { "board_id": boardId, "card_title": cardTitle, "status_id": statusId}
    await apiPost("/api/boards/add-new-card/", payload)
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
    await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(payload)
    })
}

async function apiDelete(url, payload="") {
    await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(payload)
    })
}

async function apiPut(url, payload="") {
    await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify(payload)
})
}
