import { dataHandler } from "../data/dataHandler.js";
import { domManager } from "../view/domManager.js";

const myModal = new window.bootstrap.Modal(document.getElementById('registration-modal'), {
  keyboard: false
});

export let modalManager = {
    registration: function() {
        const registrationBtn = document.getElementById('registration-btn');
        registrationBtn.addEventListener('click', registrationHandler);
    },
}

async function registrationHandler() {
    myModal.show();
    const username = document.getElementById('recipient-registration-name').value;
    const password1 = document.getElementById('psw1').value;
    const password2 = document.getElementById('psw2').value;
    const warning = document.getElementById('psw-div').firstElementChild;
    if (password1 !== password2) {
        warning.innerText = 'The two passwords do not match!';
        return;
    } else if (warning.innerText) {
        warning.innerText.remove();
    }
    const registrationData = {
        'username': username,
        'psw': password1
    }
    const response = await dataHandler.registerUser(registrationData);
    // if response is true user is already registered
    if (response) {
        // clear modal and add warning 'user is already registered, please, log in!'
        const alert = `<div class="mb-3 alert alert-danger" role="alert" id="alert-div">
                            This username is already registered!
                        </div>`
        domManager.addChild('#modal-form', alert);
    } else {
        if (document.getElementById('alert-div')) {
            document.getElementById('alert-div').remove();
        }
        document.getElementById('recipient-registration-name').value = "";
        document.getElementById('psw1').value = "";
        document.getElementById('psw2').value = "";
        myModal.hide();
    }
}