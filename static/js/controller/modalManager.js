import { dataHandler } from "../data/dataHandler.js";

export let modalManager = {
    registration: async function() {
        const registrationBtn = document.getElementById('registration-btn');
        registrationBtn.addEventListener('click', registrationHandler);
    }
}

async function registrationHandler() {
    const username = document.getElementById('recipient-name').value;
    const password1 = document.getElementById('psw1').value;
    const password2 = document.getElementById('psw2').value;
    if (password1 !== password2) {
        // add warning to modal
    }
    const registrationData = {
        'username': username,
        'psw': password1
    }
    const response = dataHandler.registerUser(registrationData);
    // if response is true user is already registered
    if (response) {
        // clear modal and add warning 'user is already registered, please, log in!'
    }
}