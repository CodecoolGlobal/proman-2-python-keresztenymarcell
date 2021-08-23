import {dataHandler} from "../data/dataHandler.js";

const verificationList = [];


export async function userManagerFunc() {
    const button = document.querySelector('#loginModalButton')

    button.addEventListener(
        "click",
        checkLogin
      );
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
        await verification()
    }

async function verification(){
    if (verificationList.includes('true')){
            alert('Login OK! Please close the window!')
            verificationList.length = 0;
        }
    else {
        alert('please try again!')
        verificationList.length = 0;
    }
}