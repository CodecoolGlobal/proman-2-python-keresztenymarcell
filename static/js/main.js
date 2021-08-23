import {boardsManager, buttonManager} from "./controller/boardsManager.js";
import { modalManager } from "../controller/modalManager.js";


function init() {
   modalManager.registration();
   buttonManager.loadBoards();
   boardsManager.loadBoards();
}

init();
