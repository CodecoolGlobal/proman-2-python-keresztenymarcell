import { dataHandler } from "../data/dataHandler.js";


let actualCard = null;


export async function DragAndDrop() {
    const cardSlots = document.querySelectorAll('.board-column-content');
    const cards = document.querySelectorAll('.card');


    for (const card of cards){
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);

    }



    for (const cardSlot of cardSlots) {
        cardSlot.addEventListener('dragover', dragOver);
        cardSlot.addEventListener('dragenter', dragEnter);
        cardSlot.addEventListener('dragleave', dragLeave);
        cardSlot.addEventListener('drop', dragDrop);
    }


    // function dropCard(e) {
    //
    //     // dataHandler.changeCardOrder()
    // }

    function dragStart(e) {
        actualCard = e.currentTarget;
        actualCard.style.filter = "grayscale(100)"
        const cards = e.currentTarget.parentElement.children
        for (let i in cards) {
            cards[i].dataset.cardOrder = +i + 1
        }
    }


    function dragEnd(e) {
        actualCard.style.filter = "grayscale(0)"
        const cardId = e.currentTarget.dataset.cardId
        const parent = e.currentTarget.parentElement
        // (Array.prototype.indexOf.call(parent.children, e.currentTarget)+1)
        // const array = Array.from(parent.children)
        // console.log(array.indexOf(e.currentTarget))
        const newPosition = parent.children.length
        dataHandler.changeCardOrder(newPosition, cardId)
    }


    function dragOver(e) {
        e.preventDefault();
    }


    function dragEnter(e) {
        e.preventDefault();
    }


    function dragLeave() {
    }


    function dragDrop(e) {
        let board = e.currentTarget.parentNode.parentElement;
        let board_id = board.parentNode.dataset.boardId
        let board_2 = actualCard.parentNode.parentElement;
        let board_id_2 = board_2.parentNode.parentNode.dataset.boardId;

        if( board_id_2 === board_id){
            e.currentTarget.appendChild(actualCard);
            let status_id = e.currentTarget.parentNode.dataset.columnId;
            let card_id = actualCard.dataset.cardId;
            dataHandler.updateCards(status_id, card_id);
        }
    }
}

