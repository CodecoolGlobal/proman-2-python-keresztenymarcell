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
        domManager.addEventListener(`.board-container[data-board-id="${boardId}"] .board-columns .delete-column-button[data-delete-status-id="${status.id}"]`, "click", deleteStatus);

        }
    }
}


async function deleteStatus(clickEvent){
    const statusId = clickEvent.target.attributes['data-delete-status-id'].nodeValue;
    console.log(statusId)
    console.log("Delete 1 - StatusID")
    await dataHandler.deleteStatusById(statusId)
    let statuses = document.getElementsByClassName('board-column');
    for (let status of statuses) {
        console.log(status)
        console.log("Delete 2- Status")
        if(statusId === status.attributes['data-column-id'].nodeValue) {
            console.log(status)
            parent.removeChild(status)
            break;
        }
    }
}