import {dataHandler} from "../data/dataHandler.js";
import {domManager, clearBoard} from "../view/domManager.js";
import {resetForm} from "../controller/modalManager.js";
import {boardsManager, buttonManager} from "./boardsManager.js";


const myModal = new window.bootstrap.Modal(document.getElementById('login-modal'), {
  keyboard: false
})
const verificationList = [];


export async function userManagerFunc() {
    const loginModalButton = document.querySelector('#loginModalButton')
    loginModalButton.addEventListener("click",checkLogin);
    const closeModalButton = document.querySelector('#close-modal');
    closeModalButton.addEventListener('click', () => resetForm('modal-login-form','alert-login'))
    const closeButton = document.querySelector('#closeModalButton');
    closeButton.addEventListener('click', () => resetForm('modal-login-form','alert-login'))
    await logOut();
  }

async function checkLogin(){
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const userUserDataToCheck = {
            'username': username,
            'password': password
        }
        const userData = await dataHandler.getLogin(userUserDataToCheck);
        await verification(userData);
    }


async function verification(userData){
    if (userData) {
        const username = document.querySelector('#username').value;
        resetForm('modal-login-form','alert-login')
        const user = await dataHandler.getUserId(username);
        const user_id = user[0]['id'];
        myModal.hide();
        sessionStorage.setItem('user', username);
        sessionStorage.setItem('id', user_id);
        changeNavbar()
        await boardRefreshByUserData()
        await markPrivateBoard()

    }
    else {
        alertMsg();
        myModal.show();
        verificationList.length = 0;
    }
}

async function logOut(){
    const logOutButton = document.querySelector('#logout')
    logOutButton.addEventListener('click',logOutHandler )
}


async function logOutHandler(){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('id');
    document.querySelector('#logedinuser').innerHTML = "";
    document.querySelector('#login').textContent = "Log in";
    document.querySelector('#registration').textContent = "Register";
    document.querySelector('#logout').textContent = "";
    document.querySelector('#load-private-board-form').style.display = 'None';
    clearBoard();
    await buttonManager.loadButtons();
    await boardsManager.loadBoards();
}


function alertMsg(){
    const alert = `<div class="alert alert-danger alert-dismissible fade show" role="alert" id="alert-login">
                                                                      <strong>Holy guacamole!</strong> Invalid username or password. Please try again.
                                                                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                 </div>`
    domManager.addChild('#modal-login-form', alert);
}

function changeNavbar(){
    document.querySelector('#logedinuser').innerHTML = 'Logged in as:' + " " + sessionStorage.getItem('user')
    document.querySelector('#login').textContent = "";
    document.querySelector('#registration').textContent = "";
    document.querySelector('#logout').textContent = "Logout";
}


async function boardRefreshByUserData(){
    clearBoard();
    await buttonManager.loadButtons();
    document.querySelector('#load-private-board-form').style.display = 'inline';
    await boardsManager.loadBoards();
}

export async function markPrivateBoard(){
    const allBoards = document.querySelectorAll('.board-container');
    for (let board of allBoards) {
        const boardUserId = parseInt(board.dataset.user);
        const privateStatus = parseInt(board.dataset.private);
        if (boardUserId && privateStatus === 0){
            const privateSpan = board.firstElementChild.firstElementChild;
            privateSpan.innerHTML = `<img src="/static/img/icons8-unlock-50.png" alt="unlock" data-lock="unlock">`
            privateSpan.addEventListener('click',updateUserBoardStatus)
        }
        else if (boardUserId !== NaN && privateStatus === 1){
            const publicSpan = board.firstElementChild.firstElementChild;
            publicSpan.innerHTML = `<img src="/static/img/lock-24.png" alt="lock" data-lock="lock">`
            publicSpan.addEventListener('click',updateUserBoardStatus)
        }
    }
}

function updateUserBoardStatus(e){
    const currentIcon = e.currentTarget;
    const currentIMG = currentIcon.firstElementChild;
    const currentLock = currentIMG.dataset.lock
    if (currentLock === "unlock"){
        currentIcon.firstElementChild.remove()
        currentIcon.innerHTML = `<img src="/static/img/lock-24.png" alt="lock" data-lock="lock">`

    }
    else {
        currentIcon.firstElementChild.remove()
        currentIcon.innerHTML = `<img src="/static/img/icons8-unlock-50.png" alt="unlock" data-lock="unlock">`
    }

}