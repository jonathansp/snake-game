import Engine from './engine.js';
import BoardBrowserUI from './ui/browser';

function main () {

  const engine = new Engine();
  engine.setUI(BoardBrowserUI);
  engine.run((data) => {
    console.log("data",data);
    const head = data.snake[data.snake.length-1];

    // Example code for looping the snake
    let move = ''
    if (data.snakeDirection === 'down'){
      if (head.x === data.xBound) move = 'right';
    }

    if (data.snakeDirection === 'right') {
      if (head.y === data.yBound) move = 'up';
    }

    if (data.snakeDirection === 'up') {
      if(head.x === 0) move = 'left';
    }

    if (data.snakeDirection === 'left') {
      if(head.y === 0) move = 'down';
    }

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
