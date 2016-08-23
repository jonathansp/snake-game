import Engine from './engine';

class Game {

	constructor (vm) {

		this.sandbox = { direction: null };
		this.vm = vm;

		this.engine = null;
		this.onMove = () => {};
	}

	setCode (code) {

		const playerEvaluation = { player:  null };
		this.vm.runInContext(`${code}; player = new Player();`, playerEvaluation);
		this.sandbox.player = playerEvaluation.player; // clone?
	}

	run (interval) {

		this.engine = new Engine();
		this.gameLoop = setInterval(() => {

			if (!this.engine.isGameOver()) {

				this.sandbox.gameContext = this.engine.getContext(); // clone ?
				this.vm.runInContext('direction = player.move(gameContext)', this.sandbox)
				this.engine.snakeCrawl(this.sandbox.direction);
				this.onMove(this.engine.getContext());
			}

		}, interval);
	}

  stop () {
    if( this.gameLoop ) { clearInterval(this.gameLoop); }
  }
}

export default Game;
