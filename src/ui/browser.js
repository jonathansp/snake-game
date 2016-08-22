class BoardBrowserUI {

  constructor() {
    this.table = null;

  }

  createTable (boundaries) {


    
    this.table = document.createElement('table');
    this.table.setAttribute('id', 'snake-board');
    this.table.setAttribute('width', 600);
    this.table.setAttribute('height', 600);
    this.table.setAttribute('border', 1);

    for (let line = 0; line <= boundaries.x.max; line++) {
      let tr = document.createElement('tr');
      for (let column = 0; column <= boundaries.y.max; column++) {

        let td = document.createElement('td');
        td.setAttribute('data-x', line);
        td.setAttribute('data-y', column);
        td.setAttribute('data-coordinate', '');
        tr.appendChild(td);

      }

      this.table.appendChild(tr);
    }

    document.body.appendChild(this.table);
  }

  clear () {
    for (let td of document.querySelectorAll('td')) {
      td.className = '';
    }
  }

  drawSquare (square, name) {

    let x = '[data-x="' + square.x + '"]';
    let y = '[data-y="' + square.y + '"]';
    let item = document.querySelector('td' + x + y);
    item.className = name;

  }

  render (state) {

    if (!this.table) this.createTable(state.boundaries);

    this.clear();

    for (let square of state.snake.body) {
      this.drawSquare(square, 'snake-body');
    }

    this.drawSquare(state.food, 'snake-food');

  }

}

export default BoardBrowserUI;
