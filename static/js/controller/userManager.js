import {dataHandler} from "../data/dataHandler.js";

export async function userManagerFunc() {
    const button = document.querySelector('#loginModalButton')

    button.addEventListener(
        "click",
        checkLogin,
        get_login
      );
  }

async function get_login(){
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        await dataHandler.get_loginData(username, password);
}


async function checkLogin(){
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const userData = await dataHandler.getUserData();
        for (let data of userData){
           if (data.username === username && data.password === password){
                alert('Correct')
            }
            else {
                alert ('Please try again!')
            }
        }
    }