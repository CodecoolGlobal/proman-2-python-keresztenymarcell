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
      domManager.addEventListener(`.add-new-card[add-new-card-id="${board.id}"]`, "click", createNewCard)
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
    else if (title === ""){
      element.innerHTML = "Unnamed"
      await dataHandler.renameBoard(boardId,title)
    }
  })

}


async function createNewBoard(clickEvent){
  let board = {}
  const button = clickEvent.target
  board.title = document.getElementById('new-board-title').value
  if (board.title !== ""){
    await dataHandler.createNewBoard(board.title)
    board.id = dataHandler.getNewBoardId()
    const boardBuilder = htmlFactory(htmlTemplates.board)
    const newBoard = boardBuilder(board)
    domManager.addChild("#root", newBoard);
  }
  else {
    alert('Give me a title!')
  }
};



async function createNewCard(clickEvent){
  let boardId = clickEvent.target.attributes["add-new-card-id"].nodeValue;
  let card = {
    id : 0,
    title : "New card",
    status_id : 1
  };

  await dataHandler. createNewCard(card.id, card.title, card.status_id);
  const cardBuilder = htmlFactory(htmlTemplates.card);
  const newCard = cardBuilder(card);
  domManager.addChild(`.board-container[data-board-id="${boardId}"] .board-columns .board-column[data-column-id="${card.status_id}"] .board-column-content`, newCard);
  let element = document.querySelector(`.add-new-card[add-new-card-id="${boardId}"]`);
}