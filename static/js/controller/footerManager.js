import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";


export let footerManager = {
    loadFooter: async function () {
        const footerBuilder = htmlFactory(htmlTemplates.footer);
        const content = footerBuilder()
        domManager.addChild("#footer", content);
    },
};


