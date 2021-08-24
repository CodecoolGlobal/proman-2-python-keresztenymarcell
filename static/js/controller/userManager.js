import {dataHandler} from "../data/dataHandler.js";

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
        const userData = await dataHandler.getLogin();
        for (let data of userData){
           if (data.username === username  && password === data.password){
                verificationList.push('true')
            }
            else {
                verificationList.push('false')
            }
        }
        await verification();

    }

async function verification(){
    if (verificationList.includes('true')) {
        verificationList.length = 0;
        const username = document.querySelector('#username').value;
        myModal.hide();
        sessionStorage.setItem('user', username);
        document.querySelector('#logedinuser').innerHTML = 'Logged in as:' + " " + sessionStorage.getItem('user')
        document.querySelector('#login').textContent = "";
        document.querySelector('#registration').textContent = "";
        document.querySelector('#logout').textContent = "Logout";
        document.querySelector('#load-private-board-form').style.display = 'inline';
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
       document.querySelector('.alertMsg').innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                                                      <strong>Holy guacamole!</strong> Invalid username or password. Please try again.
                                                                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                 </div>`
}

const myModal = new window.bootstrap.Modal(document.getElementById('login-modal'), {
  keyboard: false
})