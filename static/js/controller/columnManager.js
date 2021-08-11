import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";


export let columnManager = {
    loadColumns: async function (boardId){
        const statuses = await dataHandler.getStatuses(boardId);
        console.log(statuses)
        for(let status of statuses) {
        const columnBuilder = htmlFactory(htmlTemplates.column);
        const content = columnBuilder(status);
        domManager.addChild(`.board-container[data-board-id="${boardId}"] .board-columns`, content);
        domManager.addEventListener(`.board-column-title[column-title-id="${status.id}"]`, "click", renameStatus);

        }
    }
}


async function renameStatus(clickEvent){
  let statusID = clickEvent.target.attributes["column-title-id"].nodeValue
  let element = document.querySelector(`.board-column-title[column-title-id="${statusID}"]`)
  let oldTitle = element.textContent
  element.addEventListener('focusout', async function(){
    let title = element.textContent
    console.log(title)
    if(title !== oldTitle){
      await dataHandler.renameColumn(statusID, title)
    }
    if (title === ""){
      element.textContent = "Unnamed"
      await dataHandler.renameColumn(statusID,title)
    }
  })

}