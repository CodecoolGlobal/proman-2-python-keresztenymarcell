export const htmlTemplates = {
    newboard: 1,
    board: 2,
    column: 3,
    card: 4,
    archive: 5
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.newboard:
            return initNewBoardDiv
        case htmlTemplates.board:
            return boardBuilder
        case  htmlTemplates.column:
            return columnBuilder
        case htmlTemplates.card:
            return cardBuilder
        case htmlTemplates.archive:
            return archiveBuilder
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}


function boardBuilder(board) {
    return `<div class="board-container" data-board-id="${board.id}" >
                <div class="board-header"><span class="board-title" contenteditable="true" board-title-id="${board.id}">${board.title}</span>
                    <button class="add-new-card" add-new-card-id=${board.id}>Add Card</button>
                    <button class="add-new-status" add-new-status-id=${board.id}>Add New status</button>
                    <button class="delete-board" delete-board-id=${board.id}>Delete board</button>
                    <button class="toggle-archive-button" data-board-archive-id="${board.id}">Show Archive</button>
                    <button class="toggle-board-button" data-board-id="${board.id}" data-toggle-state="hide">
                    Show Cards <i class="fas fa-chevron-down"></i>
                    </button>
                </div><br>
                <div class="board-columns"></div>
            </div>`;
}

function columnBuilder(column) {
    return `<div class="board-column" data-column-id="${column.id}">
                <span class="board-column-title" column-title-id="${column.id}" contenteditable="true">${column.title}</span>
                <button class="delete-column-button" data-delete-status-id="${column.id}" data-delete-owner-id="${column.board_id}"><img class="trashcan" src="static/img/trash.png" alt="trash_icon"></button>
                <div class="board-column-content"></div>
            </div>`
}


function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}" data-card-order="${card.card_order}" draggable="true">
                <span class="card-title" card-title-id="${card.id}" contenteditable="true">${card.title}</span>
                <div class="card-archive" data-card-archive-id="${card.id}">A</div>
                <div class="card-remove" data-card-id="${card.id}"><img src="static/img/trash.png" alt="trash_icon"></div>
            </div>`;
}


function initNewBoardDiv() {
    return `<br><div id="new-board-form">
    <input type="text" 
                    placeholder="Enter new board title" 
                    id="new-board-title" 
                    name="new-board-title"
                    required 
                    autofocus 
                    autocomplete="off"><br>
           <button type="button" id="load-new-board-form">Create new board</button></div><br>`
}

function archiveBuilder(boardId) {
    return `<div class="archive" archive-board-id="${boardId}">
                <span class="archive-title">Archive</span>
                <div class="archive-content" archive-owner-id="${boardId}"></div>
            </div>`
}
