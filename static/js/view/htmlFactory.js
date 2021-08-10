export const htmlTemplates = {
    board: 1,
    card: 2
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}

function boardBuilder(board) {
    return `<div class="board-container" data-board-id=${board.id} >
                <div class="board-header"><span class="board-title" board-title-id={board.id}>${board.title}</span>
                    <button class="add-new-card" add-new-card-id=${board.id}>Add Card</button>
                    <button class="add-new-status" add-new-status-id=${board.id}>Add New status</button>
                    <button class="delete-board" delete-board-id=${board.id}>Delete board</button>
                    <button class="toggle-archive-button" data-board-archive-id="${board.id}">Show Archive</button>
                    <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
                </div>
                <div class="board-columns">
                
                </div>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}

