import Engine from './engine.js';
import BoardBrowserUI from './ui/browser';

function main () {

  const engine = new Engine();
  engine.setUI(BoardBrowserUI);
  engine.run();

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
