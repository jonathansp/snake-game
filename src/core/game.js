import Engine from './engine';

class Game {

    constructor(vm) {

        this.vm = vm;

        this.sandbox = {};
        this.vm.createContext(this.sandbox);

        this.engine = null;
        this.onMove = () => {};
    }

    setCode(code) {

        const playerEvaluation = {};
        this.vm.createContext(playerEvaluation);
        this.vm.runInNewContext(`${code}; player = new Player();`, playerEvaluation);
        this.sandbox.player = playerEvaluation.player; // clone?
    }

    run(code, interval = 50) {

        this.setCode(code);

        this.engine = new Engine();
        this.gameLoop = setInterval(() => {
            this.step();
        }, interval);
    }

    step() {
        if (!this.engine.isGameOver()) {

            this.sandbox.gameContext = this.engine.getContext(); // clone ?
            this.vm.runInNewContext('direction = player.move(gameContext)', this.sandbox)
            this.engine.snakeCrawl(this.sandbox.direction);
            this.onMove(this.engine.getContext());
        }

    }

    stop() {

        if (this.gameLoop)
            clearInterval(this.gameLoop);

    }
}

export default Game;
