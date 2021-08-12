import { dataHandler } from "../data/dataHandler.js";

let actualCard = null;


export async function dragDrop() {
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


    function dragStart(e) {
        actualCard = e.currentTarget;
        console.log(actualCard)
        console.log('start')
    }

    function dragEnd() {
        console.log('end')
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        console.log('enter')
    }

    function dragLeave() {
        console.log('leave')
    }

    function dragDrop(e) {
        e.currentTarget.appendChild(actualCard);
        let status_id = e.currentTarget.parentNode.dataset.columnId;
        let card_id = actualCard.dataset.cardId;
        console.log(status_id);
        console.log(card_id)
        dataHandler.updateCards(status_id, card_id);
        console.log('drop')
    }
}
