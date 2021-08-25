import {dataHandler} from "../data/dataHandler.js";
import {domManager, clearBoard} from "../view/domManager.js";
import {resetForm} from "../controller/modalManager.js";
import {boardsManager, buttonManager} from "./boardsManager.js";

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
        document.querySelector('#logedinuser').innerHTML = 'Logged in as:' + " " + sessionStorage.getItem('user')
        document.querySelector('#login').textContent = "";
        document.querySelector('#registration').textContent = "";
        document.querySelector('#logout').textContent = "Logout";
        clearBoard();
        await buttonManager.loadBoards();
        document.querySelector('#load-private-board-form').style.display = 'inline';
        await boardsManager.loadBoards();
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
    await buttonManager.loadBoards();
    await boardsManager.loadBoards();
}


function alertMsg(){
    const alert = `<div class="alert alert-danger alert-dismissible fade show" role="alert" id="alert-login">
                                                                      <strong>Holy guacamole!</strong> Invalid username or password. Please try again.
                                                                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                 </div>`
    domManager.addChild('#modal-login-form', alert);
}

const myModal = new window.bootstrap.Modal(document.getElementById('login-modal'), {
  keyboard: false
})