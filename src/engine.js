import Snake from './snake.js';
import Board from './board.js';

class Engine {

  constructor () {

    this.snake = new Snake()
    this.lines = 20;
    this.columns = 15;
    this.board = new Board(this.lines, this.columns, this.snake);
    this.loopInterval = 100;
    this.ui = null;
  }

  setUI (BoardUIClass) {
    this.ui = new BoardUIClass();

  }

  run (onTick) {

    if (this.ui) this.ui.createTable(this.board);
    const self = this;

    const gameLoop = setInterval(function () {
      let move = onTick({
        xBound: self.lines,
        yBound: self.columns,
        food: { x: self.board.food.x, y: self.board.food.y },
        snake: self.board.snake.body.slice(),
        snakeDirection: self.board.snake.walkingTo
      });

      self.board.snake.to(move);
      self.board.tick();

      if (self.board.gameOver()) { clearInterval(gameLoop); }
      if (self.ui) {
        self.ui.clear();
        self.ui.draw(self.board.snake.body, 'snake-body');
        self.ui.draw([self.board.food], 'snake-food');
      }
    }, this.loopInterval);
  }
}

export default Engine;
