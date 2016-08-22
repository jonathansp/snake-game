import Snake from './snake';
import Board from './board';
import Feeder from './feeder';


class Engine {

  constructor (options) {

    this.snake = new Snake()
    this.board = new Board();

    this.feeder = new Feeder(this.board.boundaries);

  }

  snakeCrawl (direction) {

    this.snake.to(direction);

    if (this.snake.found (this.feeder.food) ) {

      this.snake.eat(this.feeder.food);
      this.feeder.plant();

    }

    this.snake.move();
  }

  isGameOver () {

    return this.snake.isBytingItself() ||
           !this.board.has(this.snake.head());
  }

  getContext () {

    const context = {
      boundaries: this.board.boundaries,
      food: this.feeder.food,
      snake: {
        body: this.snake.body,
        direction: this.snake.walkingTo
      }

    }

    return context;

  }
}

export default Engine;
