/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _engine = __webpack_require__(1);

	var _engine2 = _interopRequireDefault(_engine);

	var _browser = __webpack_require__(4);

	var _browser2 = _interopRequireDefault(_browser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var engine = new _engine2.default();

	var evalMoveDecision = function evalMoveDecision() {
	  var code = document.body.querySelector('#code').value;
	  var func = function func() {
	    return "";
	  };
	  eval("func = " + code);
	  return func;
	};

	function main() {

	  engine.setUI(new _browser2.default());
	  engine.onMove = evalMoveDecision();
	  engine.run();
	}

	main();

	window.apply = function () {
	  engine.onMove = evalMoveDecision();
	  engine.restart();
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _snake = __webpack_require__(2);

	var _snake2 = _interopRequireDefault(_snake);

	var _board = __webpack_require__(3);

	var _board2 = _interopRequireDefault(_board);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Engine = function () {
	  function Engine() {
	    _classCallCheck(this, Engine);

	    var snake = new _snake2.default();
	    this.lines = 20;
	    this.columns = 15;
	    this.board = new _board2.default(this.lines, this.columns, snake);
	    this.loopInterval = 100;
	    this.ui = null;
	  }

	  _createClass(Engine, [{
	    key: 'setUI',
	    value: function setUI(boardUIClass) {
	      this.ui = boardUIClass;
	    }
	  }, {
	    key: 'run',
	    value: function run() {

	      if (this.ui) this.ui.createTable(this.board);
	      var self = this;

	      this.gameLoop = setInterval(function () {
	        var context = {
	          bound: {
	            x: self.lines,
	            y: self.columns
	          },
	          food: {
	            x: self.board.food.x,
	            y: self.board.food.y
	          },
	          snake: {
	            body: self.board.snake.body.slice(),
	            direction: self.board.snake.walkingTo
	          }
	        };

	        var direction = self.onMove.call(context); // avoid expose the engine!
	        self.board.snake.to(direction);
	        self.board.tick();

	        if (self.board.gameOver()) {
	          self.stop();
	        }
	        if (self.ui) {
	          self.ui.clear();
	          self.ui.draw(self.board.snake.body, 'snake-body');
	          self.ui.draw([self.board.food], 'snake-food');
	        }
	      }, this.loopInterval);
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (this.gameLoop) clearInterval(this.gameLoop);
	    }
	  }, {
	    key: 'restart',
	    value: function restart() {
	      if (this.ui) this.ui.clear();
	      this.stop();
	      this.board.snake = new _snake2.default();
	      this.run();
	    }
	  }]);

	  return Engine;
	}();

	function delegate(data) {
	  return engine.onMove(data);
	}

	exports.default = Engine;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Snake = function () {
	  function Snake() {
	    _classCallCheck(this, Snake);

	    this.body = [{ x: 0, y: 0 }, // <- TAIL
	    { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 } // <- HEAD
	    ];

	    this.walkingTo = 'down';
	    this.movingStack = [];
	  }

	  _createClass(Snake, [{
	    key: 'to',
	    value: function to(direction) {

	      if (this.isValidMove(direction)) {
	        this.movingStack.push(direction);
	      }
	    }
	  }, {
	    key: 'isValidMove',
	    value: function isValidMove(direction) {

	      return !(direction === 'right' && this.walkingTo === 'left' || direction === 'left' && this.walkingTo === 'right' || direction === 'up' && this.walkingTo === 'down' || direction === 'down' && this.walkingTo === 'up');
	    }
	  }, {
	    key: 'head',
	    value: function head() {

	      var head = this.body[this.body.length - 1];
	      return JSON.parse(JSON.stringify(head)); // clone object
	    }
	  }, {
	    key: 'tail',
	    value: function tail() {

	      var tail = this.body[0];
	      return JSON.parse(JSON.stringify(tail)); // clone object
	    }
	  }, {
	    key: 'found',
	    value: function found(food) {

	      var head = this.head();
	      return head.x === food.x && head.y === food.y;
	    }
	  }, {
	    key: 'eat',
	    value: function eat(food) {

	      this.body.unshift(this.tail());
	    }
	  }, {
	    key: 'isBytingItself',
	    value: function isBytingItself() {

	      // Head and other on same square
	      var h = this.head();
	      return this.body.filter(function (i) {
	        return h.x === i.x && h.y === i.y;
	      }).length > 1;
	    }
	  }, {
	    key: 'isOn',
	    value: function isOn(xBound, yBound) {
	      return this.body.filter(function (i) {
	        return i.x > xBound.max || i.x < xBound.min || i.y > yBound.max || i.y < yBound.min;
	      }).length === 0;
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      console.log(this.movingStack);
	      this.walkingTo = this.movingStack.pop() || this.walkingTo;

	      this.body.shift();
	      var head = this.head();

	      switch (this.walkingTo) {

	        case 'down':
	          this.body.push({ x: ++head.x, y: head.y });break;

	        case 'up':
	          this.body.push({ x: --head.x, y: head.y });break;

	        case 'right':
	          this.body.push({ x: head.x, y: ++head.y });break;

	        case 'left':
	          this.body.push({ x: head.x, y: --head.y });break;
	      }
	      console.log(this.body.reduce(function (a, i) {
	        return a += i.x + "-" + i.y + "|";
	      }, ""));
	    }
	  }]);

	  return Snake;
	}();

	exports.default = Snake;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Board = function () {
	  function Board(lines, columns, snake) {
	    _classCallCheck(this, Board);

	    this.snake = snake;
	    this.lines = lines;
	    this.columns = columns;
	    this.loopInterval = 100;
	    this.plant();
	    this.xBound = { min: 0, max: this.lines };
	    this.yBound = { min: 0, max: this.columns };
	  }

	  _createClass(Board, [{
	    key: "gameOver",
	    value: function gameOver() {
	      return this.snake.isBytingItself() || !this.snake.isOn(this.xBound, this.yBound);
	    }
	  }, {
	    key: "tick",
	    value: function tick() {

	      if (this.snake.found(this.food)) {
	        this.snake.eat(this.food);
	        this.plant();
	      }
	      this.snake.move();
	    }
	  }, {
	    key: "plant",
	    value: function plant() {

	      var x = Math.floor(Math.random() * this.lines) + 0;
	      var y = Math.floor(Math.random() * this.columns) + 0;
	      this.food = { x: x, y: y };
	    }
	  }]);

	  return Board;
	}();

	exports.default = Board;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BoardBrowserUI = function () {
	  function BoardBrowserUI() {
	    _classCallCheck(this, BoardBrowserUI);
	  }

	  _createClass(BoardBrowserUI, [{
	    key: 'createTable',
	    value: function createTable(board) {
	      if (this.table) return;

	      this.table = document.createElement('table');
	      this.table.setAttribute('id', 'snake-board');
	      this.table.setAttribute('width', 600);
	      this.table.setAttribute('height', 600);
	      this.table.setAttribute('border', 1);

	      for (var line = 0; line <= board.lines; line++) {
	        var tr = document.createElement('tr');
	        for (var column = 0; column <= board.columns; column++) {

	          var td = document.createElement('td');
	          td.setAttribute('data-x', line);
	          td.setAttribute('data-y', column);
	          td.setAttribute('data-coordinate', '');
	          tr.appendChild(td);
	        }

	        this.table.appendChild(tr);
	      }

	      document.body.appendChild(this.table);
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = document.querySelectorAll('td')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var td = _step.value;

	          td.className = '';
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(gameObject, name) {
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = gameObject[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var square = _step2.value;


	          var x = '[data-x="' + square.x + '"]';
	          var y = '[data-y="' + square.y + '"]';
	          var bodyItem = document.querySelector('td' + x + y);
	          bodyItem.className = name;
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	  }]);

	  return BoardBrowserUI;
	}();

	exports.default = BoardBrowserUI;

/***/ }
/******/ ]);