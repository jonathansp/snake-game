import Snake from './snake.js';
import Board from './board.js';

class Engine {

  constructor () {

    let snake = new Snake()
    this.board = new Board(50, 40, snake);
    this.loopInterval = 100;
    this.ui = null;
  }

  setUI (BoardUIClass) {
    this.ui = new BoardUIClass(this.board);

  }

  run () {

    const self = this;

    const gameLoop = setInterval(function () {
      self.board.tick();
      if (self.board.gameOver()) { clearInterval(gameLoop); }

      if (self.ui) {
        self.ui.draw();
      }
    }, this.loopInterval);
  }
}

export default Engine;
