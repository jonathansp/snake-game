class Board {

  constructor (lines, columns, snake) {

    this.snake = snake;
    this.lines = lines;
    this.columns = columns;
    this.loopInterval = 100;
    this.plant();
  }

  tick () {
    this.gameOver = this.snake.bytingItself();

    if (this.gameOver) return;

    if (this.snake.found (this.food) ) {
      this.snake.eat(this.food);
      this.plant();
    }
    this.snake.move();
  }

  plant () {

    const x = Math.floor( Math.random() * this.lines ) + 0;
    const y = Math.floor( Math.random() * this.columns ) + 0;
    this.food = { x: x, y: y };

  }
}

export default Board;
