import Engine from './engine.js';
import BoardBrowserUI from './ui/browser';

const engine = new Engine();

let evalMoveDecision = function () {
  let code = document.body.querySelector('#code').value;
  let func = () => "";
  eval("func = " + code);
  return func;
}

function main () {

  engine.setUI(new BoardBrowserUI());
  engine.onMove = evalMoveDecision();
  engine.run();

}

main();

window.apply = function () {
  engine.onMove = evalMoveDecision();
  engine.restart();
}

