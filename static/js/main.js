import {boardsManager, buttonManager} from "./controller/boardsManager.js";
import {userManagerFunc} from "./controller/userManager.js";

function init() {
   buttonManager.loadBoards();
   boardsManager.loadBoards();
   userManagerFunc()
}

init();
