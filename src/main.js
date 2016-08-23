import vm from 'vm';
import Game from './core/game';
import Engine from './core/engine';
import BoardBrowserUI from './ui/browser';

const game = new Game(vm);
const ui = new BoardBrowserUI();

game.onMove = (context) => ui.render(context);

window.apply = function() {
    const code = document.body.querySelector('#code').value;

    game.stop();
    game.run(code);
}
