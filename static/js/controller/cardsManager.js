import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";

export let cardsManager = {
  loadCards: async function (boardId) {
    const cards = await dataHandler.getCardsByBoardId(boardId);
    console.log(cards)
    for (let card of cards) {
      console.log(card)
      const cardBuilder = htmlFactory(htmlTemplates.card);
      const content = cardBuilder(card);
      if (String(card.board_id) === boardId) {
         domManager.addChild(`.board-container[data-board-id="${boardId}"] .board-columns .board-column[data-column-id="${card.status_id}"] .board-column-content`, content);
         domManager.addEventListener(`.card-remove[data-card-id="${card.id}"]`, "click", deleteButtonHandler);
         domManager.addEventListener(`.card-title[card-title-id="${card.id}"]`, "click", renameCard);

      }
    }
  },
};


async function renameCard(clickEvent){
  let cardId = clickEvent.target.attributes["card-title-id"].nodeValue
  let element = document.querySelector(`.card-title[card-title-id="${cardId}"]`)
  let oldTitle = element.textContent
  element.addEventListener('focusout', async function(){
    let title = element.textContent
    if(title !== oldTitle){
      await dataHandler.renameCard(cardId, title)
    }
    if (title === ""){
      element.textContent = "Unnamed"
      await dataHandler.renameCard(cardId,title)
    }
  })

}



function deleteButtonHandler(clickEvent) { }
