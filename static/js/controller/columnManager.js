import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";


export let columnManager = {
    loadColumns: async function (boardId){
        const columns = await dataHandler.getColumns();
        for(let column of columns){
            if (String(column.board_id) === boardId){
                const columnBuilder = htmlFactory(htmlTemplates.column);
                const content = columnBuilder(column)
                await domManager.addChild(`.board-container[data-board-id="${boardId}"] .board-columns `, content)
                await domManager.addEventListener(`.board-column-title[column-title-id="${column.id}"]`, "click", renameStatus);
                await domManager.addEventListener(`.delete-column-button[data-delete-status-id="${column.id}"]`, "click", deleteStatus);
            }
        }
    }
}


async function renameStatus(clickEvent){
  let statusID = clickEvent.target.attributes["column-title-id"].nodeValue
  let element = document.querySelector(`.board-column-title[column-title-id="${statusID}"]`)
  let oldTitle = element.textContent
  element.addEventListener('focusout', async function(){
    let title = element.textContent
    if(title !== oldTitle){
      await dataHandler.renameColumn(statusID, title)
    }
    if (title === ""){
      element.textContent = "Unnamed"
      await dataHandler.renameColumn(statusID,title)
    }
  })
}


export async function deleteStatus(clickEvent){
    const statusId = clickEvent.target.closest('[data-delete-status-id]').attributes['data-delete-status-id'].nodeValue;
    const boardId = clickEvent.target.closest('[data-delete-owner-id]').attributes['data-delete-owner-id'].nodeValue;
    await dataHandler.deleteStatusById(statusId);
    let statuses = document.getElementsByClassName('board-column');
    let owner = document.querySelector(`.board-container[data-board-id="${boardId}"] .board-columns `);
    for (let status of statuses) {
        if(statusId === status.attributes['data-column-id'].nodeValue) {
            owner.removeChild(status)
            break;
        }
    }
}