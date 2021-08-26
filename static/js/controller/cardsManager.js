import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { DragAndDrop } from "./DragAndDrop.js";

export let cardsManager = {
  loadCards: async function (boardId) {
    const cards = await dataHandler.getCardsByBoardId(boardId);
    for (let card of cards) {
      const cardBuilder = htmlFactory(htmlTemplates.card);
      const content = cardBuilder(card);
      domManager.addChild(`[data-board-id="${card.board_id}"] [data-column-id="${card.status_id}"] .board-column-content`, content);
      domManager.addEventListener(
        `.card[data-card-id="${card.id}"] .card-remove`,
        "click",
        cardsManager.deleteCardButtonHandler);
      domManager.addEventListener(`.card-title[card-title-id="${card.id}"]`, "click", renameCardHandler);
      const archiveIcon = document.querySelector(`.card-archive[data-card-archive-id="${card.id}"]`)
      const cardParent = archiveIcon.parentElement.parentElement;
      const columnTitle = cardParent.parentElement.firstElementChild;
      if (columnTitle.textContent !== 'Archive') {
        archiveIcon.addEventListener("click", archiveHandler);
      }
      DragAndDrop()
    }
  },
  deleteCardButtonHandler: async function(clickEvent){
    let cardId = clickEvent.target.closest('[data-card-id]').dataset.cardId
    let item = document.querySelector(`.card[data-card-id="${cardId}"]`)
    let parent = item.parentNode
    parent.removeChild(item)
    await dataHandler.deleteCardById(cardId)
  },
};

export async function createNewCard(clickEvent){
  let boardId = clickEvent.target.attributes["add-new-card-id"].nodeValue;
  let card = {
    id : 25,
    status_id : clickEvent.target.parentElement.parentElement.children[2].children[0].dataset.columnId,
    title : "New card",
    card_order: 1
  };
  card.card_order = await dataHandler.getCardOrderByBoardColumnId(boardId, card.status_id) + 1
  await dataHandler.createNewCard(boardId, card.title, card.status_id, card.card_order);
  const cardBuilder = htmlFactory(htmlTemplates.card);
  card.id = await dataHandler.getLastCardId();
  const newCard = cardBuilder(card);
  await domManager.addChild(`.board-container[data-board-id="${boardId}"] .board-columns .board-column[data-column-id="${card.status_id}"] .board-column-content`, newCard);
  await domManager.addEventListener(`.card[data-card-id="${card.id}"] .card-remove`, "click", cardsManager.deleteCardButtonHandler);
  await domManager.addEventListener(`.card-title[card-title-id="${card.id}"]`, "click", renameCardHandler);
  const archiveIcon = document.querySelector(`.card-archive[data-card-archive-id="${card.id}"]`)
  await archiveIcon.addEventListener("click", archiveHandler);
  await DragAndDrop()
}

export async function renameCardHandler(clickEvent){
  let cardId = clickEvent.target.attributes["card-title-id"].nodeValue
  let element = document.querySelector(`.card-title[card-title-id="${cardId}"]`)
  let oldTitle = element.textContent
  element.addEventListener('focusout', async function(){
    let title = element.textContent
    if(title !== oldTitle){
      await dataHandler.renameCard(cardId, title)
    }
    if (title === ""){
      element.textContent = "Unnamed card"
      await dataHandler.renameCard(cardId,"Unnamed card")
    }
  })
}


export async function archiveHandler(e){
  const currentCard = e.currentTarget.parentElement;
  const currentCardId = parseInt(currentCard.dataset.cardId);
  const archivestatusId = currentCard.parentElement.parentElement;
  const boardId = archivestatusId.parentElement.parentElement.dataset.boardId;
  const archiveStatus = await dataHandler.getArchiveStatusId(boardId);
  const archiveId = archiveStatus[0]['id'];
  await dataHandler.updateCards(archiveId, currentCardId)
  currentCard.remove()
  const actualArchiveColumn = document.querySelector(`.board-container[data-board-id="${boardId}"] .board-columns .board-column[data-column-id="${archiveId}"] .board-column-content`);
  await actualArchiveColumn.appendChild(currentCard);
}


