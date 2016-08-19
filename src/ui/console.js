class BoardConsoleUI {

    constructor() {
        this.matrix = null;

    }

    createMatrix(boundaries) {

        this.matrix = Array.from({ length: boundaries.x.max + 1}, () =>
            Array.from({ length: boundaries.y.max + 1 }, () => ' ')
        );

    }

    clear() {
        process.stdout.write('\u001B[2J\u001B[0;0f');
    }

    drawSquare(square, name) {

        this.matrix[square.x][square.y] = name;
    }

    render(state) {

        this.clear();
        this.createMatrix(state.boundaries);

        for (let square of state.snake.body) {
            this.drawSquare(square, 'S');
        }

        this.drawSquare(state.food, 'F');

        process.stdout.write("Snake-Game\n");
        process.stdout.write("==============================");
        process.stdout.write("\n\n\n");

        for (let i = 0; i <= state.boundaries.x.max; i++) {

            process.stdout.write("|");

            for (let j = 0; j <= state.boundaries.y.max; j++) {

                process.stdout.write(this.matrix[i][j] + "|");
            }

            process.stdout.write("\n");
        }
    }

}

export default BoardConsoleUI;
