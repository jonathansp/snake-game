import Snake from './snake.js';
import Board from './board.js';

class Engine {

  constructor () {

    const snake = new Snake()
    this.lines = 20;
    this.columns = 15;
    this.board = new Board(this.lines, this.columns, snake);
    this.loopInterval = 100;
    this.ui = null;
  }

  setUI (boardUIClass) {
    this.ui = boardUIClass;
  }

  run () {

    if (this.ui) this.ui.createTable(this.board);
    const self = this;

    this.gameLoop = setInterval(() => {
      let context = {
        bound: {
          x: self.lines,
          y: self.columns
        },
        food: {
          x: self.board.food.x,
          y: self.board.food.y
        },
        snake: {
          body: self.board.snake.body.slice(),
          direction: self.board.snake.walkingTo
        }
      };

      let direction = self.onMove.call(context); // avoid expose the engine!
      self.board.snake.to(direction);
      self.board.tick();

      if (self.board.gameOver()) { self.stop(); }
      if (self.ui) {
        self.ui.clear();
        self.ui.draw(self.board.snake.body, 'snake-body');
        self.ui.draw([self.board.food], 'snake-food');
      }
    }, this.loopInterval);
  }

  stop() {
    if (this.gameLoop) clearInterval(this.gameLoop);
  }

  restart() {
    if (this.ui) this.ui.clear();
    this.stop();
    this.board.snake = new Snake();
    this.run();
  }
}

function delegate(data) {
  return engine.onMove(data);
}

export default Engine;
