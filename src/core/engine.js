import Snake from './snake';
import Board from './board';
import Feeder from './feeder';


class Engine {

    constructor(options) {

        options = options || {};
        let context = options['context'] || {};

        this.snake = new Snake(context['snake'] || {})
        this.board = new Board(context['board'] || {});
        this.feeder = new Feeder(context['feeder'] || {
          'lines': this.board.lines,
          'columns': this.board.columns
        })
    }

    snakeCrawl(direction) {

        this.snake.to(direction);

        if (this.snake.found(this.feeder.food)) {

            this.snake.eat(this.feeder.food);
            this.feeder.plant();

        }

        this.snake.move();
    }

    step(direction) {

        let gameOver = this.isGameOver();

        if (!gameOver) {
            this.snakeCrawl(direction);
        }

        return !gameOver;
    }

    isGameOver() {

        return this.snake.isBytingItself() ||
            !this.board.has(this.snake.head());
    }

    getContext() {

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
