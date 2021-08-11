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
    // the card is retrieved and then the callback function is called with the card
  },
  createNewBoard: async function (boardTitle) {
    let payload = {"board_title": boardTitle}
    await apiPost("/api/boards/add-new-board/", payload)
  },
  createNewCard: async function (cardTitle, boardId, statusId) {
    // creates new card, saves it and calls the callback function with its data
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
