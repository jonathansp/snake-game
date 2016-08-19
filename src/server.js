import vm from 'vm';
import Game from './core/game';
import Engine from './core/engine';
import BoardConsoleUI from './ui/console';

const code = `
	class Player {
	    move(context) {

	      const head = context.snake.body[context.snake.body.length-1];

	      let move = context.snake.direction;

	      if (context.snake.direction === 'down'){
	        if (head.x === context.boundaries.x.max || head.x === context.food.x) move = 'right';
	      }

	      if (context.snake.direction === 'right') {
	        if (head.y === context.boundaries.y.max) move = 'up';
	      }

	      if (context.snake.direction === 'up') {
            if(head.x === 0 || head.x === context.food.x) move = 'left';
	      }

	      if (context.snake.direction === 'left') {
	        if(head.y === 0) move = 'down';
	      }

	      return move;
	    }
	}
`

const game = new Game(vm);
const ui = new BoardConsoleUI();

game.onMove = (context) => ui.render(context)

game.run(code);
