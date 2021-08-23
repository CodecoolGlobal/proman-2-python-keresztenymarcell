import {boardsManager, buttonManager} from "./controller/boardsManager.js";


function init() {
   buttonManager.loadBoards();
   boardsManager.loadBoards();
}

init();
