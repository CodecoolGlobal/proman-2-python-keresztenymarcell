import {dataHandler} from "../data/dataHandler.js";
import {domManager} from "../view/domManager.js";

const verificationList = [];


export async function userManagerFunc() {
    const button = document.querySelector('#loginModalButton')

    button.addEventListener(
        "click",
        checkLogin
      );
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

function clearInputFields() {
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
}

async function verification(userData){
    if (userData) {
        const username = document.querySelector('#username').value;
        if (document.getElementById('alert-login')) {
            document.getElementById('alert-login').remove();
        }
        myModal.hide();
        sessionStorage.setItem('user', username);
        document.querySelector('#logedinuser').innerHTML = 'Logged in as:' + " " + sessionStorage.getItem('user')
        document.querySelector('#login').textContent = "";
        document.querySelector('#registration').textContent = "";
        document.querySelector('#logout').textContent = "Logout";
        document.querySelector('#load-private-board-form').style.display = 'inline';
        clearInputFields();
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
    document.querySelector('#logedinuser').innerHTML = "";
    document.querySelector('#login').textContent = "Log in";
    document.querySelector('#registration').textContent = "Register";
    document.querySelector('#logout').textContent = "";
    document.querySelector('#load-private-board-form').style.display = 'None';
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