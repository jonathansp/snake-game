class Board {

  constructor (lines, columns) {

    this.lines = lines || 30;
    this.columns = columns || 30;
    this.boundaries = {
          x: { min: 0, max: this.lines - 1 },
          y: { min: 0, max: this.columns - 1 }
    }
  }

  has (square) {

    return (square.x <= this.boundaries.x.max &&
            square.x >= this.boundaries.x.min &&
            square.y <= this.boundaries.y.max &&
            square.y >= this.boundaries.y.min)

  }
}

export default Board;
