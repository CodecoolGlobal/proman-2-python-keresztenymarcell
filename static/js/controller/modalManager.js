import { dataHandler } from "../data/dataHandler.js";
import { domManager } from "../view/domManager.js";

const myModal = new window.bootstrap.Modal(document.getElementById('registration-modal'), {
  keyboard: false
});

export let modalManager = {
    registration: function() {
        const registrationBtn = document.getElementById('registration-btn');
        registrationBtn.addEventListener('click', registrationHandler);
        const regModalButton = document.querySelector('#regmodalclose');
        regModalButton.addEventListener('click', () => resetForm('modal-form','alert-div'))
        const regCloseButton = document.querySelector('#regclosebutton');
        regCloseButton.addEventListener('click', () => resetForm('modal-form','alert-div'))
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
        const alert = `<div class="mb-3 alert alert-danger alert-dismissible fade show" role="alert" id="alert-div">
                            This username is already registered!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
        domManager.addChild('#modal-form', alert);
    } else {
        myModal.hide();
        resetForm('modal-form','alert-div')
    }
}


export function resetForm(formID, alertID){
    const regForm = document.getElementById(formID);
    if (document.getElementById(alertID)) {
            document.getElementById(alertID).remove();
        }
    regForm.reset()
}