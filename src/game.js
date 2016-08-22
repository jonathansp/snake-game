import Engine from './engine';

class Game {

	constructor (vm, code) {

		this.sandbox = { direction: null };
		this.vm = vm;

		this.engine = new Engine();
		this.initSandbox(code);
		this.onMove = () => {};
	}

	initSandbox (code) {

		const playerEvaluation = { player:  null };
		this.vm.runInContext(`${code}; player = new Player();`, playerEvaluation);
		this.sandbox.player = playerEvaluation.player; // clone?
	}

	run (interval) {

		setInterval(() => {

			if (!this.engine.isGameOver()) {

				this.sandbox.gameContext = this.engine.getContext(); // clone ?
				this.vm.runInContext('direction = player.move(gameContext)', this.sandbox)
				this.engine.snakeCrawl(this.sandbox.direction);
				this.onMove(this.engine.getContext());
			}

		}, interval);
	}
}

export default Game;