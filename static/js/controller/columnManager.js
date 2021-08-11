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
            }
        }

    }
}

