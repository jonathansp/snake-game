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

	function main() {

	  var engine = new _engine2.default();
	  engine.setUI(_browser2.default);
	  engine.run();

	  document.body.addEventListener("keydown", function (event) {

	    switch (event.keyCode) {
	      case 40:
	        engine.board.snake.to('down');break;
	      case 38:
	        engine.board.snake.to('up');break;
	      case 39:
	        engine.board.snake.to('right');break;
	      case 37:
	        engine.board.snake.to('left');break;
	    }
	  });
	}

	main();

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
	    this.board = new _board2.default(50, 40, snake);
	    this.loopInterval = 100;
	    this.ui = null;
	  }

	  _createClass(Engine, [{
	    key: 'setUI',
	    value: function setUI(BoardUIClass) {
	      this.ui = new BoardUIClass(this.board);
	    }
	  }, {
	    key: 'run',
	    value: function run() {

	      var self = this;

	      setInterval(function () {
	        self.board.tick();
	        if (self.ui) {
	          self.ui.draw();
	        }
	      }, this.loopInterval);
	    }
	  }]);

	  return Engine;
	}();

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
	  }

	  _createClass(Snake, [{
	    key: 'to',
	    value: function to(direction) {

	      if (this.isValidMove(direction)) {
	        this.walkingTo = direction;
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
	    key: 'bytingItself',
	    value: function bytingItself() {

	      var head = this.head();
	      return this.body.map(function (i) {
	        return head.x === i.x && head.y === i.y;
	      }).filter(function (i) {
	        return i;
	      }).length > 1; // Head and other on same
	    }
	  }, {
	    key: 'move',
	    value: function move() {

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
	  }

	  _createClass(Board, [{
	    key: "tick",
	    value: function tick() {
	      this.gameOver = this.snake.bytingItself();

	      if (this.gameOver) return;

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
	  function BoardBrowserUI(board) {
	    _classCallCheck(this, BoardBrowserUI);

	    this.board = board;
	    this.createTable();
	  }

	  _createClass(BoardBrowserUI, [{
	    key: 'createTable',
	    value: function createTable() {

	      var table = document.createElement('table');
	      table.setAttribute('width', 600);
	      table.setAttribute('height', 600);
	      table.setAttribute('border', 1);

	      for (var line = 0; line <= this.board.lines; line++) {
	        var tr = document.createElement('tr');
	        for (var column = 0; column <= this.board.columns; column++) {

	          var td = document.createElement('td');
	          td.setAttribute('data-x', line);
	          td.setAttribute('data-y', column);
	          td.setAttribute('data-coordinate', '');
	          tr.appendChild(td);
	        }

	        table.appendChild(tr);
	      }

	      document.body.appendChild(table);
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      if (this.board.gameOver) {
	        alert("Game over!");
	      }

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

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.board.snake.body[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var square = _step2.value;


	          var _x = '[data-x="' + square.x + '"]';
	          var _y = '[data-y="' + square.y + '"]';
	          var bodyItem = document.querySelector('td' + _x + _y);
	          bodyItem.className = 'snake-body';
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

	      var x = '[data-x="' + this.board.food.x + '"]';
	      var y = '[data-y="' + this.board.food.y + '"]';
	      var foodItem = document.querySelector('td' + x + y);
	      foodItem.className = 'snake-food';
	    }
	  }]);

	  return BoardBrowserUI;
	}();

	exports.default = BoardBrowserUI;

/***/ }
/******/ ]);