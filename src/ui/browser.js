
class BoardBrowserUI {

  constructor (board) {
    this.board = board;
    this.createTable();
  }

  createTable () {

    const table = document.createElement('table');
    table.setAttribute('width', 600);
    table.setAttribute('height', 600);
    table.setAttribute('border', 1);

    for (let line = 0; line <= this.board.lines; line++) {
      let tr = document.createElement('tr');
      for (let column = 0; column <= this.board.columns; column++) {

        let td = document.createElement('td');
        td.setAttribute('data-x', line);
        td.setAttribute('data-y', column);
        td.setAttribute('data-coordinate', '');
        tr.appendChild(td);

      }

      table.appendChild(tr);
    }

    document.body.appendChild(table);
  }

  draw () {
    if (this.board.gameOver) {
      alert("Game over!");
    }

    for (let td of document.querySelectorAll('td')) {
      td.className = '';
    }

    for (let square of this.board.snake.body) {

      let x = '[data-x="' + square.x + '"]';
      let y = '[data-y="' + square.y + '"]';
      let bodyItem = document.querySelector('td' + x + y);
      bodyItem.className = 'snake-body';
    }

    const x = '[data-x="' + this.board.food.x + '"]';
    const y = '[data-y="' + this.board.food.y + '"]';
    const foodItem = document.querySelector('td' + x + y);
    foodItem.className = 'snake-food';
  }

}

export default BoardBrowserUI;
