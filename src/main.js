import vm from 'vm-shim';
import Game from './game';
import Engine from './engine';
import BoardBrowserUI from './ui/browser';

const game = new Game(vm, code);
game.onMove = (context) => ui.render(context);

const ui = new BoardBrowserUI();

window.apply = function () {
	const code = document.body.querySelector('#code').value;

  game.stop();
  game.setCode(code)
	game.run(50);
}
