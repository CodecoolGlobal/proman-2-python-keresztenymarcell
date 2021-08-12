import { dataHandler } from "../data/dataHandler.js";

let actualCard = null;
const cardSlots = document.querySelectorAll('.board-column-content');
const cards = document.querySelectorAll('.card')



export function dragDrop() {
    console.log(cardSlots)
    console.log(cards)

    for (const card of cards) {
        console.log(card)
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);
    }


    for (const cardSlot of cardSlots) {
        console.log(cardSlot)
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
        console.log('drop')
    }
}