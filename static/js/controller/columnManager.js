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

        }
    }
}

