import {boardsManager, buttonManager} from "./controller/boardsManager.js";
import {userManagerFunc} from "./controller/userManager.js";
import { modalManager } from "./controller/modalManager.js";


function init() {
   modalManager.registration();
   buttonManager.loadBoards();
   boardsManager.loadBoards();
   userManagerFunc()
}

init();
