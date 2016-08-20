import Engine from './engine.js';
import BoardBrowserUI from './ui/browser';

function main () {

  const engine = new Engine();
  engine.setUI(BoardBrowserUI);
  engine.run((data) => {
    console.log("data",data);

    // Example code for looping the snake
    let move = ''
    if (data.snakeDirection === 'down')
      if (data.snake[data.snake.length-1].x === data.xBound) move = 'right';

    if (data.snakeDirection === 'right')
      if(data.snake[data.snake.length-1].y === data.yBound) move = 'up';

    if (data.snakeDirection === 'up')
      if(data.snake[data.snake.length-1].x === 0) move = 'left';

    if (data.snakeDirection === 'left')
      if(data.snake[data.snake.length-1].y === 0) move = 'down';

    return move;
  });

  document.body.addEventListener("keydown", (event) => {

    switch (event.keyCode) {
      case 40:
        engine.board.snake.to('down'); break;
      case 38:
        engine.board.snake.to('up'); break;
      case 39:
        engine.board.snake.to('right'); break;
      case 37:
        engine.board.snake.to('left'); break;
    }
  });
}

main();
