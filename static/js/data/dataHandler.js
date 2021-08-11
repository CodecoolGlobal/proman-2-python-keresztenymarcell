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
  getCardsByBoardId: async function (boardId) {
    const response = await apiGet(`/api/boards/${boardId}/cards/`);
    return response;
  },
  getCard: async function (cardId) {
    // the card is retrieved and then the callback function is called with the card
  },
  renameBoard: async function(boardId, boardTitle){
    let payload = {"board_id": boardId, "board_title": boardTitle}
    await apiPost(`/api/rename-board-by-id`, payload)
  },
    createNewBoard: async function (boardTitle) {
    // creates new board, saves it and calls the callback function with its data
  },
  createNewCard: async function (cardTitle, boardId, statusId) {
    // creates new card, saves it and calls the callback function with its data
  },
    deleteBoardById: async function(boardId){
        let payload = {"board_id": boardId}
        await apiDelete(`/api/delete-board-by-id/${boardId}`,payload)
    },
    deleteStatusById: async function(statusId){
        let payload = {"status_id": statusId}
        await apiDelete(`/api/delete-status-by-id/${statusId}`,payload)
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
