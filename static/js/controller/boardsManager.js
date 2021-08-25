import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager, createNewCard} from "./cardsManager.js";
import {columnManager, addStatus} from "./columnManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const userId = sessionStorage.getItem('id');
        const boards = await dataHandler.getBoards(userId);
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(`.toggle-board-button[data-board-id="${board.id}"]`, "click", showHideButtonHandler);
            domManager.addEventListener(`.board-title[board-title-id="${board.id}"]`, "click", renameBoard);
            domManager.addEventListener(`.add-new-card[add-new-card-id="${board.id}"]`, "click", createNewCard)
            domManager.addEventListener(`.add-new-status[add-new-status-id="${board.id}"]`, "click", addStatus);
            domManager.addEventListener(`.delete-board[delete-board-id="${board.id}"]`, "click", deleteBoard);
            domManager.addEventListener(`.toggle-archive-button[data-board-archive-id="${board.id}"]`, "click", showHideArchiveHandler)}
    },
};

export let buttonManager = {
    loadBoards: async function () {
        const buttonBuilder = htmlFactory(htmlTemplates.newboard);
        const buttoncontent = buttonBuilder();
        domManager.addChild("#root", buttoncontent);
        domManager.addEventListener(
            "#load-new-board-form",
            "click",
            createNewBoard,
        );
        domManager.addEventListener(
            "#load-private-board-form",
            "click",
            createNewBoard,
        );
    }
}

async function openBoard(boardId, button) {
    await columnManager.loadColumns(boardId)
    await cardsManager.loadCards(boardId)
    button.dataset.toggleState = "show"
    button.innerHTML = 'Hide Cards <i class="fas fa-chevron-up">'
}

async function closeBoard(boardId, button) {
    const columnContent = document.querySelector(`.board-container[data-board-id="${boardId}"] .board-columns`)
    columnContent.textContent = ""
    button.dataset.toggleState = "hide"
    button.innerHTML = 'Show Cards <i class="fas fa-chevron-down">'
}

async function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    const button = clickEvent.target;
    const add_new_button = document.querySelector(`.add-new-card[add-new-card-id="${boardId}"]`);
    if (button.dataset.toggleState === "hide") {
        await openBoard(boardId, button)
        add_new_button.style.display = "inline";
    } else {
        await closeBoard(boardId, button)
        add_new_button.style.display = "None";
    }
}


async function showHideArchiveHandler(clickEvent) {
  const boardId = clickEvent.target.dataset.boardArchiveId;
  const getStatusId = await dataHandler.getArchiveIdByBoard(boardId);
  const button = clickEvent.target;
  for (let column of getStatusId) {
    if (button.dataset.toggleState === "hide") {
      button.dataset.toggleState = "show"
      button.innerHTML = 'Hide Archive <i class="fas fa-chevron-left">'
      document.querySelector(`.board-column[data-column-id="${column["id"]}"]`).style.display = "inline";
    } else {
      button.dataset.toggleState = "hide"
      button.innerHTML = 'Show Archive <i class="fas fa-chevron-right">'
      document.querySelector(`.board-column[data-column-id="${column["id"]}"]`).style.display = "none";
    }
  }
}


async function renameBoard(clickEvent) {
    let boardId = clickEvent.target.attributes["board-title-id"].nodeValue
    let element = document.querySelector(`.board-title[board-title-id="${boardId}"]`)
    let oldTitle = element.textContent
    element.addEventListener('focusout', async function () {
        let title = element.textContent
        if (title !== oldTitle) {
            await dataHandler.renameBoard(boardId, title)
        }
        if (title === "") {
            element.innerHTML = "Unnamed"
            await dataHandler.renameBoard(boardId, title)
        }
    })
}

async function deleteBoard(clickEvent) {
    const boardId = clickEvent.target.attributes['delete-board-id'].nodeValue;
    await dataHandler.deleteBoardById(boardId)
    let boards = document.getElementsByClassName('board-container');
    for (let board of boards) {
        if (boardId === board.attributes['data-board-id'].nodeValue) {
            root.removeChild(board)
            break;
        }
    }
}

async function createNewBoard(e) {
    const click = e.currentTarget;
    clickValidation(click)
    let checkResult = checkPrivate();
    sessionStorage.removeItem('private')
    const user_id = sessionStorage.getItem('id');
    let board = {}
    const newTableInputField = document.getElementById('new-board-title');
    board.title = newTableInputField.value;
    newTableInputField.value = '';
    if (board.title !== "") {
        await dataHandler.createNewBoard(board.title, user_id, checkResult)
        document.getElementById('alertId').style.display = "None";
        board.id = await dataHandler.getNewBoardId()
        const boardBuilder = htmlFactory(htmlTemplates.board)
        const newBoard = boardBuilder(board)
        domManager.addChild("#root", newBoard);
        domManager.addEventListener(`.toggle-board-button[data-board-id="${board.id}"]`, "click", showHideButtonHandler)
        domManager.addEventListener(`.board-title[board-title-id="${board.id}"]`, "click", renameBoard);
        domManager.addEventListener(`.add-new-card[add-new-card-id="${board.id}"]`, "click", createNewCard)
        domManager.addEventListener(`.add-new-status[add-new-status-id="${board.id}"]`, "click", addStatus);
        domManager.addEventListener(`.toggle-archive-button[data-board-archive-id="${board.id}"]`, "click", showHideArchiveHandler)
        await domManager.addEventListener(`.delete-board[delete-board-id="${board.id}"]`, "click", deleteBoard);
        await dataHandler.createEmptyStatuses(board.id)
    } else {
        let alert = document.getElementById('alertId')
        alert.style.display = "inline";
    }
}


function clickValidation(click) {
    if (click.textContent === "Create new private board") {
        sessionStorage.setItem('private', 'true')
    } else {
        sessionStorage.setItem('private', 'false')
    }
}

function checkPrivate() {
    let privateBoard;
    const privateOrPublic = sessionStorage.getItem('private');
    if (privateOrPublic === 'true') {
        privateBoard = 1
    } else {
        privateBoard = 0
    }
    return privateBoard
}