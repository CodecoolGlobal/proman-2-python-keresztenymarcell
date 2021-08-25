import {boardsManager, buttonManager} from "./controller/boardsManager.js";
import {userManagerFunc} from "./controller/userManager.js";
import { modalManager } from "./controller/modalManager.js";
import {footerManager} from "./controller/footerManager.js";


function init() {
   modalManager.registration();
   buttonManager.loadButtons();
   boardsManager.loadBoards();
   footerManager.loadFooter();
   userManagerFunc()
}

init();
