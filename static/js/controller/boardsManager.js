import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { cardsManager, createNewCard} from "./cardsManager.js";
import {columnManager, addStatus} from "./columnManager.js";


export let boardsManager = {
  loadBoards: async function () {
    const boards = await dataHandler.getBoards();
    for (let board of boards) {
      const boardBuilder = htmlFactory(htmlTemplates.board);
      const content = boardBuilder(board);
      domManager.addChild("#root", content);
      domManager.addEventListener(`.toggle-board-button[data-board-id="${board.id}"]`, "click", showHideButtonHandler);
      domManager.addEventListener(`.board-title[board-title-id="${board.id}"]`, "click", renameBoard);
      domManager.addEventListener(`.add-new-card[add-new-card-id="${board.id}"]`, "click", createNewCard)
      domManager.addEventListener(`.add-new-status[add-new-status-id="${board.id}"]`, "click", addStatus);
      domManager.addEventListener(`.delete-board[delete-board-id="${board.id}"]`, "click", deleteBoard);
    }
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
        createNewBoard
      );
  }
}

async function openBoard(boardId, button){
  await columnManager.loadColumns(boardId)
  await cardsManager.loadCards(boardId)
  button.dataset.toggleState = "show"
  button.innerHTML = 'Hide Cards <i class="fas fa-chevron-up">'
}

async function closeBoard(boardId, button){
  const columnContent = document.querySelector(`.board-container[data-board-id="${boardId}"] .board-columns`)
  columnContent.textContent = ""
  button.dataset.toggleState = "hide"
  button.innerHTML = 'Show Cards <i class="fas fa-chevron-down">'
}

async function showHideButtonHandler(clickEvent) {
  const boardId = clickEvent.target.dataset.boardId;
  const button = clickEvent.target;
  const add_new_button = document.querySelector(`.add-new-card[add-new-card-id="${boardId}"]`);
  if(button.dataset.toggleState === "hide"){
    await openBoard(boardId, button)
    add_new_button.style.display = "inline";
  }
  else{
    await closeBoard(boardId, button)
    add_new_button.style.display = "None";
  }
}

async function renameBoard(clickEvent){
  let boardId = clickEvent.target.attributes["board-title-id"].nodeValue
  let element = document.querySelector(`.board-title[board-title-id="${boardId}"]`)
  let oldTitle = element.textContent
  element.addEventListener('focusout', async function(){
    let title = element.textContent
    if(title !== oldTitle){
      await dataHandler.renameBoard(boardId, title)
    }
    if (title === ""){
      element.innerHTML = "Unnamed"
      await dataHandler.renameBoard(boardId,title)
    }
  })
}

async function deleteBoard(clickEvent){
    const boardId = clickEvent.target.attributes['delete-board-id'].nodeValue;
    await dataHandler.deleteBoardById(boardId)
    let boards = document.getElementsByClassName('board-container');
    for (let board of boards) {
        if(boardId === board.attributes['data-board-id'].nodeValue) {
            root.removeChild(board)
            break;
        }
    }
}

async function createNewBoard(){
  let board = {}
  board.title = document.getElementById('new-board-title').value
  if (board.title !== ""){
    document.getElementById('alertId').style.display = "None";
    await dataHandler.createNewBoard(board.title)
    board.id = await dataHandler.getNewBoardId()
    const boardBuilder = htmlFactory(htmlTemplates.board)
    const newBoard = boardBuilder(board)
    domManager.addChild("#root", newBoard);
    domManager.addEventListener(`.toggle-board-button[data-board-id="${board.id}"]`, "click", showHideButtonHandler)
    domManager.addEventListener(`.board-title[board-title-id="${board.id}"]`, "click", renameBoard);
    domManager.addEventListener(`.add-new-card[add-new-card-id="${board.id}"]`, "click", createNewCard)
    domManager.addEventListener(`.add-new-status[add-new-status-id="${board.id}"]`, "click", addStatus);
    await domManager.addEventListener(`.delete-board[delete-board-id="${board.id}"]`, "click", deleteBoard);
    await dataHandler.createEmptyStatuses(board.id)
  }
  else {
    let alert = document.getElementById('alertId')
    alert.style.display = "inline";
  }
}
