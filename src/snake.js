
class Snake {

  constructor () {

    this.body = [

      {x: 0, y: 0}, // <- TAIL
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 3, y: 0}  // <- HEAD
    ];

    this.walkingTo = 'down';
  }

  to (direction) {

    if (this.isValidMove(direction) ) {
        this.walkingTo = direction;
    }
  }


  isValidMove (direction) {

    return !( (direction === 'right' && this.walkingTo === 'left') ||
              (direction === 'left' && this.walkingTo === 'right') ||
              (direction === 'up' && this.walkingTo === 'down')    ||
              (direction === 'down' && this.walkingTo === 'up') );
  }

  head () {

    const head = this.body[this.body.length - 1];
    return JSON.parse( JSON.stringify ( head ));  // clone object
  }

  tail () {

    const tail = this.body[0];
    return JSON.parse( JSON.stringify ( tail ));  // clone object
  }

  found (food) {

    const head = this.head();
    return (head.x === food.x && head.y === food.y);
  }

  eat (food) {

    this.body.unshift( this.tail() );
  }

  isBytingItself () {

    // Head and other on same square
    const h = this.head();
    return this.body.filter((i) => h.x === i.x && h.y === i.y).length > 1
  }


  move () {
 
    this.body.shift();
    const head = this.head();

    switch (this.walkingTo) {

      case 'down':
        this.body.push( { x: ++head.x, y: head.y } );  break;

      case 'up':
        this.body.push( { x: --head.x, y: head.y } );  break;

      case 'right':
        this.body.push( { x: head.x, y: ++head.y } );  break;

      case 'left':
        this.body.push( { x: head.x, y: --head.y } );  break;
    }
  }
}

export default Snake;
