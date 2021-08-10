import {boardsManager, buttonManager} from "./controller/boardsManager.js";

function init() {
  boardsManager.loadBoards();
  buttonManager.loadBoards();

}

init();
