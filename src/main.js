import vm from 'vm-shim';
import Game from './game';
import Engine from './engine';
import BoardBrowserUI from './ui/browser';



window.apply = function () {

	const code = document.body.querySelector('#code').value;
	const game = new Game(vm, code);
	const ui = new BoardBrowserUI();

	game.onMove = (context) => ui.render(context);
	game.run(50);
}