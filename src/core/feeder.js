class Feeder {

    constructor(boundaries) {
        this.lines = boundaries.x.max;
        this.columns = boundaries.y.max;
    }

    plant(lines, columns) {

        const x = Math.floor(Math.random() * this.lines) + 0;
        const y = Math.floor(Math.random() * this.columns) + 0;
        this.food = { x: x, y: y };

    }
}

export default Feeder;
