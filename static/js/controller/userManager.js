import {dataHandler} from "../data/dataHandler.js";

export async function userManagerFunc() {
    const button = document.querySelector('#loginModalButton')

    button.addEventListener(
        "click",
        get_login
      );
  }

async function get_login(){
        const username = document.querySelector('#username').value;
        console.log(username)
        const password = document.querySelector('#password').value;
        console.log(password)
        await dataHandler.get_loginData(username, password);
}