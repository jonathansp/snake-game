class Feeder {

    constructor(options) {

        this.lines = options['lines'];
        this.columns = options['columns'];

        if('food' in options) {
          this.food = options['food'];
        } else {
          this.plant();
        }
    }

    plant(lines, columns) {

        const x = Math.floor(Math.random() * this.lines) + 0;
        const y = Math.floor(Math.random() * this.columns) + 0;
        this.food = { x: x, y: y };

    }
}

export default Feeder;
