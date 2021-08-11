import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { cardsManager } from "./cardsManager.js";
import {columnManager} from "./columnManager.js";

export let boardsManager = {
  loadBoards: async function () {
    const boards = await dataHandler.getBoards();
    for (let board of boards) {
      const boardBuilder = htmlFactory(htmlTemplates.board);
      const content = boardBuilder(board);
      domManager.addChild("#root", content);
      domManager.addEventListener(`.toggle-board-button[data-board-id="${board.id}"]`, "click", showHideButtonHandler);
      domManager.addEventListener(`.board-title[board-title-id="${board.id}"]`, "click", renameBoard);
      domManager.addEventListener(`.add-new-status[add-new-status-id="${board.id}"]`, "click", addStatus);
    }
  },

};

async function openBoard(boardId, button){
  await columnManager.loadColumns(boardId)
  await cardsManager.loadCards(boardId)
  button.dataset.toggleState = "show"
  button.textContent = "Hide Cards"
}

async function closeBoard(boardId, button){
  const columnContent = document.querySelector(`.board-container[data-board-id="${boardId}"] .board-columns`)
  columnContent.textContent = ""
  button.dataset.toggleState = "hide"
  button.textContent = "Show Cards"
}

async function showHideButtonHandler(clickEvent) {
  const boardId = clickEvent.target.dataset.boardId;
  const button = clickEvent.target
  if(button.dataset.toggleState === "hide"){
    await openBoard(boardId, button)
  }
  else{
    await closeBoard(boardId, button)
  }
}

async function addStatus(clickEvent){
  const boardID = clickEvent.target.attributes["add-new-status-id"].nodeValue
  const button = document.querySelector(`.board-container[data-board-id="${boardID}"] .toggle-board-button`)
  console.log(button)
  let status = {
    title: "New Status",
    board_id: boardID
  }
  if(button.dataset.toggleState === "show"){
    await dataHandler.createNewStatus(status.title, status.board_id)
    status.id = dataHandler.getLastStatusId()
    const columnBuilder = htmlFactory(htmlTemplates.column)
    let column = columnBuilder(status)
    domManager.addChild(`.board-container[data-board-id="${boardID}"] .board-columns `, column)
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
    else if (title === ""){
      element.innerHTML = "Unnamed"
      await dataHandler.renameBoard(boardId,title)
    }
  })

}


