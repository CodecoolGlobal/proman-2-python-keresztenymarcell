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
      domManager.addEventListener(
        `.toggle-board-button[data-board-id="${board.id}"]`,
        "click",
        showHideButtonHandler
      );
    }
  },
};


export let buttonManager = {
  loadBoards: async function () {
    const buttonBuilder = htmlFactory(htmlTemplates.createboard);
    const buttoncontent = buttonBuilder();
    domManager.addChild("#root", buttoncontent);
    domManager.addEventListener(
        "#load-new-board-form",
        "click",
      );
  }
}

async function openBoard(boardId, button){
  await columnManager.loadColumns(boardId)
  await cardsManager.loadCards(boardId)
  button.dataset.toggleState = "show"
  button.textContent = "Hide Cards"
}


async function closeBoard(boardId, button){
  const columnContent = document.querySelector(`.board-container[data-board-id="${boardId}"] .board-columns`)
  console.log(columnContent)
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



