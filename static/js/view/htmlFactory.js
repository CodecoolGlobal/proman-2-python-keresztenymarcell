export const htmlTemplates = {
    newboard: 1,
    board: 2,
    column: 3,
    card: 4,
    footer:5
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.newboard:
            return initNewBoardDiv
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.column:
            return columnBuilder
        case htmlTemplates.card:
            return cardBuilder
        case htmlTemplates.footer:
            return footerBuilder
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}


function boardBuilder(board) {
    return `<div class="board-container" data-board-id="${board.id}" data-private="${board.is_private}" data-user="${board.user_id}">
                <div class="board-header">
                    <span class="lock" board-title-id="${board.id}"></span>
                    <span class="board-title" contenteditable="true" board-title-id="${board.id}">${board.title}</span>
                    <button class="add-new-card" add-new-card-id=${board.id}>Add Card</button>
                    <button class="add-new-status" add-new-status-id=${board.id}>Add New status</button>
                    <button class="delete-board" delete-board-id=${board.id}>Delete board</button>
                    <button class="toggle-archive-button" data-board-archive-id="${board.id}" data-toggle-state="hide">
                    Show Archive <i class="fas fa-chevron-right"></i>
                    </button>
                    <button class="toggle-board-button" data-board-id="${board.id}" data-toggle-state="hide">
                    Show Cards <i class="fas fa-chevron-down"></i>
                    </button>
                </div><br>
                <div class="board-columns"></div>
            </div>`;
}
//display: none OR inline
function columnBuilder(column) {
    if (column.title === 'Archive'){
    return `<div class="board-column" style="display: none" data-column-id="${column.id}" title-id="${column.title}"> 
            <span class="board-column-title" column-title-id="${column.id}" contenteditable="true">${column.title}</span>
            <div class="board-column-content"></div>
        </div>`
    }
    else{
        if (column.title !== 'New' && column.title !== 'In progress' && column.title !== 'Testing' && column.title !== 'Done') {
            return `<div class="board-column" data-column-id="${column.id}" title-id="${column.title}">
                    <span class="board-column-title" column-title-id="${column.id}" contenteditable="true">${column.title}</span>
                    <button class="delete-column-button" data-delete-status-id="${column.id}" data-delete-owner-id="${column.board_id}"><img class="trashcan" src="static/img/trash.png" alt="trash_icon"></button>
                    <div class="board-column-content"></div>
                </div>`
    }
        else {
            return `<div class="board-column" data-column-id="${column.id}" title-id="${column.title}">
                    <span class="board-column-title" column-title-id="${column.id}" contenteditable="true">${column.title}</span>
                    <div class="board-column-content"></div>
                </div>`
        }
    }
}


function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}" data-card-order="${card.card_order}" draggable="true">
                <span class="card-title" card-title-id="${card.id}" contenteditable="true">${card.title}</span>
                <div class="card-archive" data-card-archive-id="${card.id}">
                    <img src="static/img/icons8-save-16.png" alt="archive_icon">
                </div>
                <div class="card-remove" data-card-id="${card.id}">
                    <img src="static/img/trash.png" alt="trash_icon">
                </div>
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
           <button type="button" id="load-new-board-form">Create new board</button>
           <button type="button" id="load-private-board-form">Create new private board</button></div><br>`
}


function footerBuilder() {
    return `<footer class="bg-light text-center text-white">
            <div class="text-center p-3" id="footer-div">
                © 2021 Copyright:
                <a class="text-white" href="https://trollo-project.herokuapp.com/">Trollo-project</a>
            </div>
            </footer>`
}