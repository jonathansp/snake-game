
class BoardBrowserUI {

  createTable (board) {
    if (this.table) return;

    this.table = document.createElement('table');
    this.table.setAttribute('id', 'snake-board');
    this.table.setAttribute('width', 600);
    this.table.setAttribute('height', 600);
    this.table.setAttribute('border', 1);

    for (let line = 0; line <= board.lines; line++) {
      let tr = document.createElement('tr');
      for (let column = 0; column <= board.columns; column++) {

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

  draw (gameObject, name) {
    for (let square of gameObject) {

      let x = '[data-x="' + square.x + '"]';
      let y = '[data-y="' + square.y + '"]';
      let bodyItem = document.querySelector('td' + x + y);
      bodyItem.className = name;
    }

  }

}

export default BoardBrowserUI;
